# Generated by Django 5.1.3 on 2024-11-13 07:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_log', '0007_famille'),
    ]

    operations = [
        migrations.CreateModel(
            name='Formation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('formation_effectuer', models.CharField(max_length=300)),
                ('annee_obtention', models.CharField(max_length=100)),
                ('declarant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth_log.information')),
            ],
        ),
    ]
