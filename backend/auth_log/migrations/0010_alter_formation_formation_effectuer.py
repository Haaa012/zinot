# Generated by Django 5.1.3 on 2024-11-13 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_log', '0009_alter_formation_formation_effectuer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formation',
            name='formation_effectuer',
            field=models.CharField(max_length=300),
        ),
    ]