from rest_framework import serializers
from .models import Category,Message,Product,ProductPrice
from django.contrib.auth.models import User, Group
from django.db import migrations, models

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('pk','name')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

#class MessageSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Message
#        fields = ('name','text','date')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name','category','likes','user','pk')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('name','date','text','email','pk')

class ProductPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPrice
        fields = ('product','price','start_date','end_date','pk')

#Below is a serializer without a model for my Django Rest framework/React enigma app
class EnigmaSerializer(serializers.Serializer):
   result = serializers.CharField()
