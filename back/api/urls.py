from django.urls import path
from .views import *

urlpatterns = [
    path('authors', listar_autores),
    path('publishers', listar_editoras),
    path('books', listar_livros),
    
    ###GET e POST
    path('autores', AutoresView.as_view()),
    path('editoras', EditorasView.as_view()),
    path('livros', LivrosView.as_view()),

    ###UPDATE e DELETE
    path('autor/<int:pk>', AutoresDetailView.as_view() ), 
    path('editora/<int:pk>', EditorasDetailView.as_view()),
    path('livro/<int:pk>', LivrosDetailView.as_view()),
    
]