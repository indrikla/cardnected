from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.Pack)
class PackAdmin(admin.ModelAdmin):
    list_display = ('pack', 'image')