from rest_framework import serializers
from .models import Client,Information,Sante,Parcours,Famille,Formation

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = '__all__'

class SanteSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Sante
        fields = '__all__'

class ParcoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcours
        fields ='__all__'

class FamilleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Famille
        fields ='__all__'

class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = '__all__'