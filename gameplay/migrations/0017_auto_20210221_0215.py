# Generated by Django 3.1.1 on 2021-02-20 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameplay', '0016_auto_20210221_0211'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gameplayrecord',
            name='numOfCards',
            field=models.IntegerField(null=True, verbose_name='Number of Cards'),
        ),
    ]