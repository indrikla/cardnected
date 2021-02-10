# Generated by Django 3.1.1 on 2021-02-10 16:09

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameplay', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Perspective',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.IntegerField(null=True, verbose_name='Index')),
                ('level', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)], verbose_name='Level')),
                ('question', models.TextField(max_length=400, null=True, verbose_name='Question')),
                ('image', models.CharField(max_length=100, null=True, verbose_name='Image')),
            ],
            options={
                'db_table': 'Perspective',
            },
        ),
    ]