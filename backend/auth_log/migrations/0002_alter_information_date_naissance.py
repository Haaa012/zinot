# Generated by Django 5.1.3 on 2024-11-06 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_log', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='date_naissance',
            field=models.CharField(max_length=30),
        ),
    ]
