from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sga/auth/login/', views.mostrar_login, name='mostrar_login'),
    path('sga/auth/login/procesar/', views.procesar_login, name='procesar_login'),
    path('sga/auth/logout/', views.cerrar_sesion, name='cerrar_sesion'),
    path('sga/home/', views.mostrar_home, name='mostrar_home'),
    path('sga/personas/', views.mostrar_personas, name='mostrar_personas'),
    path('sga/personas/tabla/', views.tabla_personas, name='tabla_personas'),
    path('sga/personas/guardar/', views.guardar_persona, name='guardar_persona'),
    path('sga/personas/modificar', views.modificar_persona, name='modificar_persona'),
    path('sga/personas/<int:persona_id>/detalle', views.detalle_persona, name='detalle_persona'),
    path('sga/personas/<int:persona_id>/eliminar', views.eliminar_persona, name='eliminar_persona'),
    path('sga/bautismos/', views.mostrar_bautismos, name='mostrar_bautismos'),
]
