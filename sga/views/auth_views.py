from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.shortcuts import render, redirect
from django.contrib import messages


def mostrar_login(request):
    return render(request, 'login.html')    


@require_POST
def procesar_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        usuario = authenticate(request, username=username, password=password)
        if usuario is not None:
            login(request, usuario)
            return redirect('mostrar_home')
        else:
            messages.add_message(request, messages.ERROR, 'Credenciales inválidas. Inténtalo de nuevo.')
    return redirect('mostrar_login')


@login_required
def cerrar_sesion(request):
    logout(request)
    return redirect('mostrar_login')