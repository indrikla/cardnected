from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.DigDeeper1)
class DigDeeper1Admin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.DigDeeper2)
class DigDeeper2Admin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.DigDeeper3)
class DigDeeper3Admin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.Perspective)
class PerspectiveAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.IceBreak)
class IceBreakAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.Lovebirds)
class LovebirdsAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.Stranger)
class StrangerAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.MixNMatch)
class MixNMatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'image')
    search_fields = ('id', 'question', 'image')

@admin.register(models.Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('report', 'pack', 'questionID', 'question', 'desc')
    search_fields = ('report', 'question', 'pack')

@admin.register(models.GameplayRecord)
class GameplayRecordAdmin(admin.ModelAdmin):
    list_display = ('dateTime','player', 'pack', 'numOfCards')
    search_fields = ('dateTime','pack', 'numOfCards', 'player')