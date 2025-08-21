from django.urls import path
from .views import AutoresView, listar_autores, EditorasView, listar_editoras, LivrosView, listar_livros

urlpatterns = [
    path('autores', AutoresView.as_view()),
    path('authors', listar_autores),

    path('editoras', EditorasView.as_view()),
    path('publishers', listar_editoras),

    path('livros', LivrosView.as_view()),
    path('books', listar_livros)
]