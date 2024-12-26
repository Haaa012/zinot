# Generated by Django 5.1.3 on 2024-11-09 09:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_log', '0006_parcours'),
    ]

    operations = [
        migrations.CreateModel(
            name='Famille',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom_conjoint', models.CharField(max_length=100)),
                ('naissance_conjoint', models.CharField(max_length=100)),
                ('age_conjoint', models.CharField(max_length=5)),
                ('genre_conjoint', models.CharField(max_length=5)),
                ('profession_conjoint', models.CharField(max_length=100)),
                ('telephone_conjoint', models.CharField(max_length=20)),
                ('nom_enfant', models.CharField(max_length=500)),
                ('acharge_enfant', models.CharField(max_length=100)),
                ('naissance_enfant', models.CharField(max_length=200)),
                ('genre_enfant', models.CharField(max_length=50)),
                ('dece_enfant', models.CharField(max_length=100)),
                ('declarant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth_log.information')),
            ],
        ),
    ]
