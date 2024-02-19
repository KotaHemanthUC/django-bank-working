from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import permissions, viewsets
from django.contrib.auth.models import User
from .serializers import AccountSerializer, TransactionSerializer
from .models import Account, Transaction
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, mixins, generics
from django.http import Http404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
 
 # import rest_framework User

class AccountViePermission(permissions.BasePermission):
    message = 'view is restricted to the owner only'
    def has_object_permission(self, request, view, obj):
        return obj.account_holder == request.user

class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AccountDetail(generics.RetrieveUpdateDestroyAPIView, AccountViePermission):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, AccountViePermission]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]