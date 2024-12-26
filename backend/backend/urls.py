from django.contrib import admin
from django.urls import path
from auth_log import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/enregistrer/' , views.enregistrer , name='enregistrer'),
    path('api/seconnecter/' , views.seconnecter , name="seconnecter"),

    path('api/compter_employer/' , views.compter_employer , name = 'compter_employer'),
    path('api/ajouter_employer/' , views.ajouter_employer , name = "ajouter_employer"),
    path('api/afficher_employer/' , views.afficher_employer , name = "afficher_employer"),
    path('api/modifier_employer/<int:id>/' , views.modifier_employer , name = "modifier_employer"),
    
    path('api/afficher_sante/' , views.afficher_sante , name = "afficher_sante"),
    path('api/ajouter_sante/<int:id>/' , views.ajouter_sante , name = "ajouter_sante"),
    path('api/recupere_sante/<int:id>/' , views.recupere_sante , name = 'recupere_sante'),

    path('api/afficher_parcours/' , views.afficher_parcours , name = 'afficher_parcours'),
    path('api/ajouter_parcours/<int:id>/' , views.ajouter_parcours , name = 'ajouter_parcours'),
    path('api/recupere_parcours/<int:id>/' , views.recupere_parcours , name = 'recupere_parcours'),

    path('api/afficher_famille/' , views.afficher_famille , name ='afficher_famille'),
    path('api/ajouter_famille/<int:id>/' , views.ajouter_famille , name = 'ajouter_famille'),
    path('api/recupere_famille/<int:id>/' , views.recupere_famille , name = 'recupere_famille'),

    path('api/afficher_formation/', views.afficher_formation , name = 'afficher_formation'),
    path('api/ajouter_formation/<int:id>/' , views.ajouter_formation , name = 'ajouter_formation'),
    path('api/recupere_formation/<int:id>/' , views.recupere_formation , name = 'recupere_formation'),

    path('api/delete_liste/<int:id>/' , views.delete_liste , name = 'delete_liste')

]
