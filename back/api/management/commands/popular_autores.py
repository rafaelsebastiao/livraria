import pandas as pd
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from api.models import Autor



class Command(BaseCommand):
   def add_arguments(self, parser):
        parser.add_argument("--arquivo", default="population/autores.csv")
        parser.add_argument("--truncate", action="store_true")
        parser.add_argument("--update", action="store_true")

   @transaction.atomic
   def handle(self, *a, **o):
        df = pd.read_csv(o["arquivo"], enconding="utf-8-sig" )
        df.columns = [c.strip().lower().lstrip("\ufeff") for c in df.columns]
        #Normaliza os nomes das colunas: tira os espaços extras, deixa em minúsculo e remove o ufeff
        #o \ufeff é um caractere especial invisível 

        if o["truncate"]: Autor.objects.all().delete()

        df['autor'] = df['autor'].astype(str).str.strip()

        df['s_autor'] = df['s_autor'].astype(str).strip()


        df['nasc'] = pd.to_datetime(df["nasc"], erros="coerce", format="%Y-%m-%d").dt.date


        #pega a nacionalidade se existir, se nao ele pega nada(vazio "")
        df['nacio'] = df.get('nacio', "").astype(str).strip().capitalize().replace({"": None})

        
        # df.dropna(subset=['nasc']) Apaga a linha que contém erros
        df = df.query("autor != '' and s_autor != '' ")
        
        if o["update"]:
            criados = atualizados = 0

            for r in df.itertuples(index=False):
                _, created = Autor.objects.update_or_create(
                    autor = r.autor, s_autor = r.s_autor, nasc = r.nasc,  
                    defaults={'nacio': r.nacio}
                )

                criados += int(created)
                atualizados += int(not created)

            self.stdout.write(self.style.SUCESS(f"Criados: ${criados} | ${atualizados}"))
        else:
            objs = [Autor(
                  autor = r.autor, s_autor = r.s_autor, nasc = r.nasc, nacio = r.nacio  
            ) for r in df.itertuples(index=False)
            ]

            Autor.objects.bulk_create(objs, ignore_conflicts=True)
            # bulk_create está jogando no banco reserva sem os dado sem conflito

            self.stdout.write(self.style.SUCESS(f'Criados ${len(objs)}'))
            
        # autor, s_autor, nasc, nacio