export interface Editora {
    id: Number;
    editora: Number;
    cnpj: string;
    endereco: string;
    telefone: string;
    email?: string | null;
    site?: string | null;   
}


// editora = models.CharField(max_length=100)
// cnpj = models.CharField(max_length=18, unique=True, null=True, blank=True)
// endereco = models.CharField(max_length=200, null=True, blank=True)
// telefone = models.CharField()
// email = models.EmailField()
// site = models.URLField(max_length=200)
