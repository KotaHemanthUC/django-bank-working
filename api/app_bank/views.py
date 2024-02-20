from rest_framework import permissions, viewsets
from .serializers import AccountSerializer, TransactionSerializer
from .models import Account, Transaction
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Case, When, DecimalField
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions

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
    
    @action(detail=False, methods=['GET'], url_path='balance-on-date', url_name='balance_on_date')
    def balance_on_date(self, request, pk=None):
        # get the balance of the account on a specific date
        account_id = request.query_params.get('account_id')
        date = request.query_params.get('date')
        account = Account.objects.get(account_id=account_id)
        Transactions = account.transactions.filter(date__lte=date)
        balance = account.current_balance
        for transaction in Transactions:
            if transaction.transaction_type == 'CREDIT':
                balance += transaction.amount
            else:
                balance -= transaction.amount
        return Response({"balance": balance})


class TransactionList(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        # get the transactions of the user by getting the accounts of the user and then getting the transactions of the accounts
        return Transaction.objects.filter(account__account_holder=self.request.user)
    
    def get_object(self):
        return super().get_object()
    
    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            # check if an account_id is provided in the query params
            account_id = request.query_params.get('account_id')
            if account_id:
                # return the transactions of the account
                account = Account.objects.get(account_id=account_id)
                queryset = account.transactions.all()
                serializer = TransactionSerializer(queryset, many=True)
                return Response(serializer.data)
            else:
                # return the transactions of the user
                serializer = TransactionSerializer(self.get_queryset(), many=True)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={"detail": "Authentication credentials were not provided."})
        
    def perform_create(self, serializer):
        # get the accpunt from the request and then save the transaction
        # then update the account balance
        account = Account.objects.get(account_id=self.request.data['account'])
        serializer.save(account=account)
        if serializer.validated_data['transaction_type'] == 'CREDIT':
            account.current_balance += serializer.validated_data['amount']
        else:
            account.current_balance -= serializer.validated_data['amount']
        account.save()
