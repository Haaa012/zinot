from django.db import models

class Client(models.Model):
    Nom = models.CharField(max_length=100)  # Utilisation de CharField pour le nom
    Email = models.EmailField(unique=True, max_length=100)
    Password = models.CharField(max_length=100)  # Il est préférable de stocker un mot de passe haché

    def __str__(self):
        return self.Nom

class Information(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=30)  # Taille ajustée à 30 caractères
    age = models.IntegerField()
    genre = models.CharField(max_length=20)  # Par exemple : "Homme", "Femme", etc.
    adresse = models.CharField(max_length=200)
    date_naissance = models.CharField(max_length=30)
    telephone = models.CharField(max_length=15)  # Format téléphonique standard
    email = models.EmailField(max_length=40)
    cnaps = models.CharField(max_length=20)
    commune = models.CharField(max_length=100)
    num_bancaire = models.CharField(max_length=100 , null=True)
    nom_banque = models.CharField(max_length=100)
    cle = models.CharField(max_length=10)
    code_postal = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Sante(models.Model):
    tel_urgence = models.CharField(max_length=300 , null=True)
    etat_sante = models.CharField(max_length=200, null=True)
    declarant = models.ForeignKey(Information , on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.tel_urgence} {self.etat_sante}"

class Parcours(models.Model):
    poste_anterieur = models.CharField(max_length=200)
    periode_debut = models.CharField(max_length=100)
    periode_fin = models.CharField(max_length=100)
    adresse_employeur = models.CharField(max_length=200)
    poste_contrat = models.CharField(max_length=100)
    type_contrat = models.CharField(max_length=10)
    qualification = models.CharField(max_length=100)
    horaire_hebdo = models.CharField(max_length=10)
    debut_contrat = models.CharField(max_length=20)
    fin_contrat = models.CharField(max_length=10)
    salaire_net = models.CharField(max_length=20)
    salaire_brut = models.CharField(max_length=20)
    declarant = models.ForeignKey(Information , on_delete=models.CASCADE) 
    
    def __str__(self):
        return f"{self.poste_anterieur} {self.poste_contrat}"
        
class Famille(models.Model):
    nom_conjoint =  models.CharField(max_length=100)
    naissance_conjoint = models.CharField(max_length=100)
    age_conjoint = models.CharField(max_length=5)
    genre_conjoint = models.CharField(max_length=5)
    profession_conjoint = models.CharField(max_length=100)
    telephone_conjoint = models.CharField(max_length=20)
    nom_enfant = models.CharField(max_length=500)
    acharge_enfant = models.CharField(max_length=100)
    naissance_enfant = models.CharField(max_length=200)
    genre_enfant = models.CharField(max_length=50)
    dece_enfant = models.CharField(max_length=100)
    declarant = models.ForeignKey(Information , on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.nom_conjoint}{self.genre_conjoint}"

class Formation(models.Model):
    formation_effectuer = models.CharField(max_length=200)
    annee_obtention = models.CharField(max_length=100)
    declarant = models.ForeignKey(Information , on_delete=models.CASCADE) 
    
    def __str_(self):
        return f"{self.formation_effectuer}{self.annee_obtention}"
