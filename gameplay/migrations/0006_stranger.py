# Generated by Django 3.1.1 on 2021-02-11 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameplay', '0005_lovebirds'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stranger',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField(max_length=400, null=True, verbose_name='Question')),
                ('image', models.CharField(max_length=100, null=True, verbose_name='Image')),
            ],
            options={
                'db_table': 'Stranger',
            },
        ),
    ]
