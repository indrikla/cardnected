# Generated by Django 3.1.1 on 2021-02-10 16:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gameplay', '0003_auto_20210210_2352'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='digdeeper1',
            name='index',
        ),
        migrations.RemoveField(
            model_name='digdeeper2',
            name='index',
        ),
        migrations.RemoveField(
            model_name='digdeeper3',
            name='index',
        ),
        migrations.RemoveField(
            model_name='icebreak',
            name='index',
        ),
        migrations.RemoveField(
            model_name='perspective',
            name='index',
        ),
    ]
