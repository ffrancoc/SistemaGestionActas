# Sistema de Gestión de Actas Sacramentales

Este sistema permite registrar, consultar y actualizar actas de bautismo, comunión, confirmación y matrimonio. Está construido con tecnologías modernas que integran claridad visual, interacción dinámica y validación afirmativa.

🧩 Características principales

- Registro completo de personas con campos como nombre, lugar de nacimiento, parroquia de pertenencia, padres y fecha de nacimiento.
- Módulos específicos para cada sacramento: bautismo, comunión, confirmación y matrimonio.
- Validación visual con SweetAlert2 para una experiencia afirmativa y clara.
- Actualización dinámica de tablas y formularios con HTMX, sin recargar la página.
- Estilo visual limpio y simbólico usando TailwindCSS y DaisyUI.

🛠️ Tecnologías utilizadas

- Python 3.11+
- Django 4.2+
- HTMX
- TailwindCSS + DaisyUI
- SweetAlert2
- SQLite3 (puedes migrar a PostgreSQL si lo deseas)

🚀 Instalación
cd SistemaGestionActas
python -m venv venv
source venv/bin/activate # o venv\Scripts\activate en Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
