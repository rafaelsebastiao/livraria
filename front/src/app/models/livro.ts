export interface Livro{
    id: Number;
    titulo: string;
    subtitulo: string;
    autor: string;
    editora: string;
    isbn: string | null;
    descricao: string;
    idioma: string;
    ano: Number;
    paginas: Number;
    preco: Number
    estoque: Number;
    desconto: Number;
    disponivel: Number;
    dimensoes: string
    peso: Number
}




/*
class Livro(models.Model):
    titulo = models.CharField(max_length=50)
    subtitulo = models.CharField(max_length=255)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE)
    editora = models.ForeignKey(Editora, on_delete=models.CASCADE)
    isbn = models.CharField(max_length=255)
    descricao = models.TextField()
    idioma = models.CharField(max_length=255, default="Português")
    ano = models.IntegerField()
    paginas = models.IntegerField()
    preco = models.DecimalField(max_digits=10, decimal_places=2) 
    estoque= models.IntegerField()
    desconto= models.DecimalField(max_digits=10, decimal_places=2)
    disponivel=models.BooleanField(default=True)
    dimensoes=models.CharField()
    peso=models.DecimalField(max_digits=10, decimal_places=2)



*/