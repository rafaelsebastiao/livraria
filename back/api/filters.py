import django_filters as df
from django.db.models import Q
from .models import Autor

class AutorFilter(df.FilterSet):
    autor = df.CharFilter(method='filter_autor')
    nacio = df.CharFilter(field_name='nacio', lookup_expr='iexact')

    def filter_nome(self, qs, value: str):
        if not value:
            return qs
        return qs.filter(Q(autor__icontains=value) | Q(s_autor__icontains=value))

    class Meta:
        model = Autor
        fields = []  
