from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sga/auth/login/", views.mostrar_login, name="mostrar_login"),
    path("sga/auth/login/procesar/", views.procesar_login, name="procesar_login"),
    path("sga/auth/logout/", views.cerrar_sesion, name="cerrar_sesion"),
    path("sga/home/", views.mostrar_home, name="mostrar_home"),
    path("sga/registros/", views.mostrar_registros, name="mostrar_registros"),
    path("sga/registros/contrayentes", views.registros_contrayente, name="contrayentes"),
    path("sga/registros/tabla/", views.tabla_registros, name="tabla_registros"),
    path("sga/registro/guardar/", views.guardar_registro, name="guardar_registro"),
    path(
        "sga/registro/<int:registro_id>/detalle",
        views.detalle_registro,
        name="detalle_registro",
    ),
    path(
        "sga/registro/<int:registro_id>/eliminar",
        views.eliminar_registro,
        name="eliminar_registro",
    ),
    path(
        "sga/registro/<int:registro_id>/detalles/actas",
        views.detalle_actas,
        name="detalle_actas",
    ),
    path("sga/bautismos/", views.mostrar_bautismos, name="mostrar_bautismos"),
    path("sga/bautismo/guardar", views.guardar_bautismo, name="guardar_bautismo"),
    path(
        "sga/bautismo/<int:bautismo_id>/eliminar",
        views.eliminar_bautismo,
        name="eliminar_bautismo",
    ),
    path("sga/comuniones/", views.mostrar_comuniones, name="mostrar_comuniones"),
    path("sga/comunion/guardar", views.guardar_comunion, name="guardar_comunion"),
    path(
        "sga/comunion/<int:comunion_id>/eliminar",
        views.eliminar_comunion,
        name="eliminar_comunion",
    ),
    path(
        "sga/confirmaciones/",
        views.mostrar_confirmaciones,
        name="mostrar_confirmaciones",
    ),
    path(
        "sga/confirmacion/guardar",
        views.guardar_confirmacion,
        name="guardar_confirmacion",
    ),
    path(
        "sga/confirmacion/<int:confirmacion_id>/eliminar",
        views.eliminar_confirmacion,
        name="eliminar_confirmacion",
    ),
    path("sga/contrayentes/tabla/", views.tabla_contrayentes, name="tabla_contrayentes"),
]
