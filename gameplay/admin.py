from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.DigDeeper)
class DigDeeperAdmin(admin.ModelAdmin):
    list_display = ('id', 'index', 'level', 'question', 'image')
    search_fields = ('question','level','image')

@admin.register(models.IceBreak)
class IceBreakAdmin(admin.ModelAdmin):
    list_display = ('id', 'index', 'level', 'question', 'image')
    search_fields = ('question','level','image')
