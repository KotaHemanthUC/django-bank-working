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

class AccountViewPermission(permissions.BasePermission):
    message = 'view is restricted to the owner only'
    def has_object_permission(self, request, view, obj):
        return obj.account_holder == request.user
    
class AccountList(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    permission_classes = [AccountViewPermission]

    def get_queryset(self):
        return Account.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(account_holder=self.request.user)
    
    def get_object(self):
        return super().get_object()
    
    def list(self, request, *args, **kwargs):
        # return the accounts of the user
        if request.user.is_authenticated:
            queryset = Account.objects.filter(account_holder=request.user)
            serializer = AccountSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={"detail": "Authentication credentials were not provided."})

