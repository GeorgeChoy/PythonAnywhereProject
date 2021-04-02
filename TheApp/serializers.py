from rest_framework import serializers
from .models import Category
from django.contrib.auth.models import User, Group

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
