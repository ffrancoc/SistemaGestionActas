from .registros_views import (
    mostrar_registros,
    tabla_registros,
    tabla_contrayentes,
    guardar_registro,
    detalle_registro,
    eliminar_registro,
    detalle_actas,
    registros_contrayente,
)
from .auth_views import mostrar_login, procesar_login, cerrar_sesion
from .bautismos_views import guardar_bautismo, mostrar_bautismos, eliminar_bautismo
from .comunion_views import guardar_comunion, mostrar_comuniones, eliminar_comunion
from .confirmacion_views import (
    guardar_confirmacion,
    mostrar_confirmaciones,
    eliminar_confirmacion,
)
from .core_views import index, mostrar_home
