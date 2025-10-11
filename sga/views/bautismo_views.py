from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required
@require_GET
def mostrar_bautismos(request):
    return render(request, 'bautismos.html')