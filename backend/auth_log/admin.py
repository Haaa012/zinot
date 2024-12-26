from django.contrib import admin
from .models import Client,Information,Sante,Parcours,Famille,Formation
@admin.register(Client)
@admin.register(Information)
@admin.register(Sante)
@admin.register(Parcours)
@admin.register(Famille)
@admin.register(Formation)

class Client(admin.ModelAdmin):
    display_list = ('id' , 'Nom' ,'Email'  ,'Password')


class Information(admin.ModelAdmin):
    display_list = ('id_info' ,  'nom' ,
   ' prenom',
    'age',
    'genre',
    'adresse',
    'date_naissance',
    'telephone',
    'email',
   ' num_cnaps',
    'commune',
    'num_bancaire',
    'nom_banque',
    'cle',
    'code_postal'
)
class Sante(admin.ModelAdmin):
    display_list = ( 'tel_urgence' ,'etat_sante' , 'declarant')


class Parcours(admin.ModelAdmin):
    display_list = (
    'poste_anterieur' ,
    'periode_debut ',
    'periode_fin ',
    'adresse_employeur ',
    'poste_contrat ',
    'type_contrat ',
    'qualification',
    'horaire_hebdo',
    'debut_contrat ',
    'fin_contrat ',
    'salaire_net ',
    'salaire_brut ',
    'declarant'
    )

class Famille(admin.ModelAdmin):
    display_list = (
    'nom_conjoint ',
    'naissance_conjoint ',
    'age_conjoint ',
    'genre_conjoint ',
    'profession_conjoint ' ,
    'telephone_conjoint ',
    'nom_enfant ',
    'acharge_enfant ',
    'naissance_enfant',
    'genre_enfant ',
    'dece_enfant ',
    'declarant '
    )
    
class Formation(admin.ModelAdmin):
    display_list = (
        'Formation',
        'Annee_obtention',
        'declarant'
    )