from rest_framework import serializers
from app_bank.models import Account, Transaction
from django.contrib.auth.models import User
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_id', 'account_number', 'current_balance','account_holder']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'date', 'transaction_type', 'note', 'amount', 'account']