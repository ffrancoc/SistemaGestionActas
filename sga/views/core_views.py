from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET
from django.shortcuts import redirect, render
from ..models import Persona

@require_GET
def index(request):
    return redirect('mostrar_login')


@login_required
@require_GET
def mostrar_home(request):
    count_personas = len(Persona.objects.all())


    return render(request, 'home.html', context={
        'count_personas': count_personas
    })
