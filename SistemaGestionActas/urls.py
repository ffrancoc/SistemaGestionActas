
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('sga.urls')),
    path('', include('django_select2.urls')),
    path('admin/', admin.site.urls),
]
