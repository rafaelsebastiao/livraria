import pandas as pd
from django.core.management.base import BaseCommand
from django.db import transaction
from api.models import Editora


class Command(BaseCommand):
   def add_arguments(self, parser):
        # parser.add_argument("--arquivo", default="population/autores.csv")
        parser.add_argument("--arquivo", default="C:/Users/44794549857/Documents/livraria/back/api/population/editoras.csv")
        parser.add_argument("--truncate", action="store_true")
        parser.add_argument("--update", action="store_true")
   
   @transaction.atomic
   def handle(self, *a, **o):
        df = pd.read_csv(o["arquivo"], encoding="utf-8-sig" )
        df.columns = [c.strip().lower().lstrip("\ufeff") for c in df.columns]
        #Normaliza os nomes das colunas: tira os espaços extras, deixa em minúsculo e remove o ufeff
        #o \ufeff é um caractere especial invisível 
        if o["truncate"]: Editora.objects.all().delete()

        df['editora'] = df['editora'].astype(str).str.strip()
        df['cnpj'] = df['cnpj'].astype(str).str.strip()
        df['endereco'] = df['endereco'].astype(str).str.strip()
        df['telefone'] = df['telefone'].astype(str).str.strip()
        df['email'] = df['email'].astype(str).str.strip()
        df['site'] = df['site'].astype(str).str.strip()
            
        if o["update"]:
            criados = atualizados = 0

            for r in df.itertuples(index=False):
                _, created = Editora.objects.update_or_create(
                    editora = r.editora, cnpj = r.cnpj, endereco = r.endereco,  
                    telefone= r.telefone, email=r.email, site=r.site
                )

                criados += int(created)
                atualizados += int(not created)

            self.stdout.write(self.style.SUCCESS(f"Criados: {criados} | {atualizados}"))
        else:
            objs = [Editora(
                  editora = r.editora, cnpj = r.cnpj, endereco = r.endereco, 
                  telefone = r.telefone, email=r.email, site=r.site

            ) for r in df.itertuples(index=False)
            ]

            Editora.objects.bulk_create(objs, ignore_conflicts=True)

            self.stdout.write(self.style.SUCCESS(f'Criados {len(objs)}'))