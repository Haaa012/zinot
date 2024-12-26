from .serializer import InfoSerializer,SanteSerializer,ParcoursSerializer,FamilleSerializer,FormationSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Client,Information,Sante,Parcours,Famille, Formation
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status

    
@api_view(['POST','GET']) 
def enregistrer(request):
    if request.method == 'POST':
        nom = request.data.get('Nom')
        email = request.data.get('Email')
        password = request.data.get('Password')
         
        if Client.objects.filter(Nom = nom):
            return Response({"message" : "Le nom existe déjà"} , status=400)

        # Vérifie si l'email existe déjà
        if Client.objects.filter(Email=email).exists():
            return Response({"message": "L'adresse email existe déjà"}, status=400)

        # Vérifie si tous les champs sont fournis
        if not email or not password:
            return Response({"message": "Tous les champs sont obligatoires"}, status=400)

        # Crée un nouvel utilisateur
        new_user = Client(Nom = nom , Email=email, Password=password)
        if new_user.Password:
            print(new_user.Password)
        else:
            print('non , pas de passe')
        try:
            new_user.save()
            return Response({"message": "Inscription réussie"}, status=201)
        except Exception as e:
            print(e)
            return Response({"message": "Veuillez réessayer "}, status=500)
        
    return Response({"message": "Cette route accepte des requêtes POST pour l'inscription."}, status=200)



    
@api_view(['POST','GET'])
@ensure_csrf_cookie
def seconnecter(request):
    if request.method == 'GET':
        # Ceci est pour la configuration CSRF lors de l'initialisation
        return JsonResponse({"message": "CSRF cookie set"})

    elif request.method == 'POST':
        # Récupération des données envoyées par le client
        email = request.data.get('Email')
        password = request.data.get('Password')

        try:
            # Récupérer l'utilisateur par l'email
            user = Client.objects.get(Email=email)

            # Vérification du mot de passe avec check_password
            if user.Password == password:
                return Response({"message": "Vous êtes connectés"}, status=200)
            else:
                return Response({"message": "Mot de passe incorrect"}, status=400)

        except Client.DoesNotExist:
            return Response({"message": "Adresse email invalide"}, status=400)
                    
@api_view(['POST', 'GET'])
def ajouter_employer(request):
    if request.method == 'POST':
        Nom_c = request.data.get('nom')
        Prenom_c = request.data.get('prenom')
        Age_c = request.data.get('age')
        Genre_c = request.data.get('genre')
        Adresse_c = request.data.get('adresse')
        Dat_naiss = request.data.get('date_naissance')
        Phone = request.data.get('telephone')
        Email_c = request.data.get('email')
        Num_cnaps = request.data.get('cnaps')
        Commune_c = request.data.get('commune')
        Num_bancaire = request.data.get('num_bancaire')
        Nom_banque = request.data.get('nom_banque')
        Cle_b = request.data.get('cle')
        Code_p = request.data.get('code_postal')

        # Vérifier si l'email existe déjà
        if Information.objects.filter(email=Email_c):
            return Response({"message": "Le nom existe déjà"}, status=400)

        else:
            # Création et sauvegarde de l'objet Information
            new_info = Information(
            nom=Nom_c, 
            prenom=Prenom_c, 
            age=Age_c, 
            genre= Genre_c ,
            adresse=Adresse_c,
            date_naissance=Dat_naiss,
            telephone=Phone, 
            email=Email_c, 
            cnaps=Num_cnaps, 
            commune=Commune_c, 
            num_bancaire= Num_bancaire, 
            nom_banque=Nom_banque, 
            cle=Cle_b, 
            code_postal=Code_p
            )

            try:
                new_info.save()
                return Response({'message': 'Ajout avec succès !!!'} , status=201)
            except Exception as e:
                print(f"Erreur lors de l'ajout de l'employeur: {str(e)}")
                return Response({'message': 'Échec de l\'ajout', 'error': str(e)})
  
    # Cas GET
    else:
        return Response({"message": "Méthode GET non autorisée pour ajouter un employeur"})


@api_view(['GET'])
def afficher_employer(request):
    if request.method == 'GET':
        employers = Information.objects.all()  # Correction ici: .all() au lieu de .get()
        serializer = InfoSerializer(employers, many=True)  # Sérialisation des données
        return Response(serializer.data)  # Retourne les données sérialisées sous forme de JSON

@api_view(['PUT'])
def modifier_employer(request, id):
    try:
        employer = Information.objects.get(id=id)
    except Information.DoesNotExist:
        return Response({"message": "L'utilisateur n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

    serializer = InfoSerializer(employer, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Modification avec succès !"}, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        # Ajout de l'affichage des erreurs pour le débogage
        return Response({
            "message": "Vérifier que tous les champs sont bien remplies",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def afficher_sante(request):
    if request.method == 'GET':
        employers = Sante.objects.all()  # Correction ici: .all() au lieu de .get()
        serializer = SanteSerializer(employers, many=True)  # Sérialisation des données
        return Response(serializer.data)  # Retourne les données sérialisées sous forme de JSON

@api_view(['GET'])
def recupere_sante(request, id):
    if request.method == 'GET':
        try:
            declarant = Information.objects.get(id=id)
            sante = Sante.objects.get(declarant=declarant)
        except Information.DoesNotExist:
            return Response({"error": "Information not found"}, status=404)
        except Sante.DoesNotExist:
            return Response({"error": "Health information not found"}, status=404)

        serializer = SanteSerializer(sante)  # Sans `many=True`
        return Response(serializer.data)


@api_view(['PUT'])
def ajouter_sante(request, id):
    if request.method == 'PUT':
        # Récupérer les données du corps de la requête
        telephone = request.data.get('tel_urgence')
        etat = request.data.get('etat_sante')

        try:
            # Récupérer le déclarant avec l'ID fourni
            declarant = Information.objects.get(id=id)

            # Vérifier si une instance de Sante existe déjà pour ce déclarant
            sante, created = Sante.objects.get_or_create(declarant=declarant)
            
            # Mettre à jour les champs avec les nouvelles valeurs
            sante.tel_urgence = telephone
            sante.etat_sante = etat
            sante.save()

            message = "Ajout avec succès!" if created else "Modification avec succès!"
            return Response({"message": message})
        
        except Information.DoesNotExist:
            return Response({"message": "Déclarant introuvable"}, status=404)
        except Exception as e:
            print(e)
            return Response({"message": "Échec de l'ajout/modification"}, status=500)




@api_view(['GET'])
def afficher_parcours(request):
    if request.method == 'GET':
        employers = Parcours.objects.all()  # Correction ici: .all() au lieu de .get()
        serializer = ParcoursSerializer(employers, many=True)  # Sérialisation des données
        return Response(serializer.data)  # Retourne les données sérialisées sous forme de JSON

@api_view(['GET'])
def recupere_parcours(request, id):
    if request.method == 'GET':
        try:
            declarant = Information.objects.get(id=id)
            parcours = Parcours.objects.get(declarant=declarant)
        except Information.DoesNotExist:
            return Response({"error": "Information not found"}, status=404)
        except parcours.DoesNotExist:
            return Response({"error": "Health information not found"}, status=404)

        serializer = ParcoursSerializer(parcours)  # Sans `many=True`
        return Response(serializer.data)

@api_view(['PUT'])
def ajouter_parcours(request, id):
    if request.method == 'PUT':
        # Récupérer les données du corps de la requête
        Poste_anterieur = request.data.get('poste_anterieur')
        Periode_debut = request.data.get('periode_debut')
        Periode_fin = request.data.get('periode_fin')
        Adresse_employeur = request.data.get('adresse_employeur')
        Poste_contrat = request.data.get('poste_contrat')
        Type_contrat = request.data.get('type_contrat')
        Qualification = request.data.get('qualification')
        Horaire_hebdo = request.data.get('horaire_hebdo')
        Debut_contrat = request.data.get('debut_contrat')
        Fin_contrat = request.data.get('fin_contrat')
        Salaire_net = request.data.get('salaire_net')
        Salaire_brut = request.data.get('salaire_brut')
        

        try:
            # Récupérer le déclarant avec l'ID fourni
            declarant = Information.objects.get(id=id)

            # Vérifier si une instance de Sante existe déjà pour ce déclarant
            parcours, created = Parcours.objects.get_or_create(declarant=declarant)
            
            # Mettre à jour les champs avec les nouvelles valeurs
            parcours.poste_anterieur = Poste_anterieur
            parcours.periode_debut = Periode_debut
            parcours.periode_fin = Periode_fin
            parcours.adresse_employeur = Adresse_employeur
            parcours.poste_contrat = Poste_contrat
            parcours.type_contrat = Type_contrat
            parcours.qualification = Qualification
            parcours.horaire_hebdo = Horaire_hebdo
            parcours.debut_contrat = Debut_contrat
            parcours.fin_contrat = Fin_contrat
            parcours.salaire_net = Salaire_net
            parcours.salaire_brut = Salaire_brut

            parcours.save()

            message = "Ajout avec succès!" if created else "Modification avec succès!"
            return Response({"message": message})
        
        except Information.DoesNotExist:
            return Response({"message": "Déclarant introuvable"}, status=404)
        except Exception as e:
            print(e)
            return Response({"message": "Échec de l'ajout/modification"}, status=500)



@api_view(['GET'])
def afficher_famille(request):
    if request.method == 'GET':
        employers = Famille.objects.all()  # Correction ici: .all() au lieu de .get()
        serializer = FamilleSerializer(employers, many=True)  # Sérialisation des données
        return Response(serializer.data)  # Retourne les données sérialisées sous forme de JSON

@api_view(['GET'])
def recupere_famille(request, id):
    if request.method == 'GET':
        try:
            declarant = Information.objects.get(id=id)
            famille = Famille.objects.get(declarant=declarant)
        except Information.DoesNotExist:
            return Response({"error": "Information not found"}, status=404)
        except famille.DoesNotExist:
            return Response({"error": "Health information not found"}, status=404)

        serializer = FamilleSerializer(famille)  # Sans `many=True`
        return Response(serializer.data)


@api_view(['PUT'])
def ajouter_famille(request, id):
    if request.method == 'PUT':
        # Récupérer les données du corps de la requête
        Nom_conjoint = request.data.get('nom_conjoint')
        Naissance_conjoint = request.data.get('naissance_conjoint')
        Age_conjoint = request.data.get('age_conjoint')
        Genre_conjoint = request.data.get('genre_conjoint')
        Profession_conjoint = request.data.get('profession_conjoint')
        Telephone_conjoint = request.data.get('telephone_conjoint')
        Nom_enfant = request.data.get('nom_enfant')
        Acharge_enfant = request.data.get('acharge_enfant')
        Naissance_enfant = request.data.get('naissance_enfant')
        Genre_enfant = request.data.get('genre_enfant')
        Dece_enfant = request.data.get('dece_enfant')

        try:
            # Récupérer le déclarant avec l'ID fourni
            declarant = Information.objects.get(id=id)

            # Vérifier si une instance de Sante existe déjà pour ce déclarant
            famille, created = Famille.objects.get_or_create(declarant=declarant)
            
            # Mettre à jour les champs avec les nouvelles valeurs
            famille.nom_conjoint = Nom_conjoint
            famille.naissance_conjoint = Naissance_conjoint
            famille.age_conjoint = Age_conjoint
            famille.genre_conjoint = Genre_conjoint
            famille.profession_conjoint = Profession_conjoint
            famille.telephone_conjoint = Telephone_conjoint
            famille.nom_enfant = Nom_enfant
            famille.acharge_enfant = Acharge_enfant
            famille.naissance_enfant = Naissance_enfant
            famille.genre_enfant = Genre_enfant
            famille.dece_enfant = Dece_enfant
            famille.save()

            message = "Ajout avec succès!" if created else "Modification avec succès!"
            return Response({"message": message})
        
        except Information.DoesNotExist:
            return Response({"message": "Déclarant introuvable"}, status=404)
        except Exception as e:
            print(e)
            return Response({"message": "Échec de l'ajout/modification"}, status=500)

@api_view(['DELETE'])
def delete_liste(request , id):
    if request.method == 'DELETE':
        currentliste = Information.objects.get(id = id)
    try:
        currentliste.delete()
        return Response({'message' , 'Suppression avec succès ! '})

    except Exception as e:
        print(e)
        return Response({"message" , "Echec de suppression !"})


def compter_employer(request):
    nombre_employes = Information.objects.count()
    return JsonResponse({'nombre_employes': nombre_employes})

@api_view(['GET'])
def afficher_formation(request):
    formations = Formation.objects.all()
    serializer = FormationSerializer(formations, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def ajouter_formation(request, id):
    Formation_effectuer = request.data.get('formation_effectuer')
    Annee_obtention = request.data.get('annee_obtention')

    try:
        declarant = Information.objects.get(id=id)
        formation, created = Formation.objects.get_or_create(declarant=declarant)
        formation.formation_effectuer = Formation_effectuer
        formation.annee_obtention = Annee_obtention
        formation.save()
        message = "Ajout avec succès!" if created else "Modification avec succès!"
        return Response({"message": message})
    except Information.DoesNotExist:
        return Response({"message": "Déclarant introuvable"}, status=404)
    except Exception as e:
        print(e)
        return Response({"message": "Échec de l'ajout/modification"}, status=500)
        

@api_view(['GET'])
def recupere_formation(request , id):
    if request.method == 'GET':
        declarant = Information.objects.get(id = id)
        formation = Formation.objects.get(declarant= declarant)
        serializer = FormationSerializer(formation)
        return Response(serializer.data)
