# Generated by Django 5.1.3 on 2024-11-13 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_log', '0008_formation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formation',
            name='formation_effectuer',
            field=models.CharField(max_length=300, null=True),
        ),
    ]