from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.ChangeLog)
class ChangeLogAdmin(admin.ModelAdmin):
    list_display = ('version', 'title', 'date', 'desc')
    search_fields = ('version', 'title', 'date')