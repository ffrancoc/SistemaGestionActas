from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET
from django.shortcuts import redirect, render
from ..models import Registro

@require_GET
def index(request):
    return redirect('mostrar_login')


@login_required
@require_GET
def mostrar_home(request):
    count_registros = len(Registro.objects.all())

    return render(request, 'home.html', context={
        'registros': count_registros
    })
