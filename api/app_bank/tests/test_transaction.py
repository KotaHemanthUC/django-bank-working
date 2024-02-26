from users.models import BankUser
from rest_framework import status
from rest_framework.test import APITestCase
from django.test import TestCase
from django.utils import timezone
from decimal import Decimal
from ..models import Account, Transaction

class TransactionAPITestCase(APITestCase):

    def setUp(self):
        # Create a test user and authenticate
        self.user = self.create_and_authenticate_user('testuser', 'test@example.com', 'testpassword')
        
        # Create an account for the user
        self.account = Account.objects.create(
            account_holder=self.user,
            current_balance=Decimal('1000.00')
        )
        self.account_id = self.account.account_id

    def create_and_authenticate_user(self, user_name, email, password):
        user = BankUser.objects.create_user(user_name=user_name, first_name='test', email=email, password=password)
        authData = {'email': email, 'password': password}
        response = self.client.post('/api/token/', authData, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + response.data['access'])
        return user

    def create_transaction(self, transaction_type, amount, account_id, note, date):
        data = {
            'transaction_type': transaction_type,
            'amount': amount,
            'account': account_id,
            'note': note,
            'date': date
        }
        return self.client.post('/bank/transactions/', data, format='json')

    def test_create_credit_transaction(self):
        response = self.create_transaction('CREDIT', '200.00', self.account_id, 'API Test Credit', '2024-02-26T15:00:00Z')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.account.refresh_from_db()
        self.assertEqual(self.account.current_balance, Decimal('1200.00'))

    def test_create_debit_transaction(self):
        response = self.create_transaction('DEBIT', '150.00', self.account_id, 'API Test Debit', '2024-02-26T15:00:00Z')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.account.refresh_from_db()
        self.assertEqual(self.account.current_balance, Decimal('850.00'))


class TransactionTestCase(TestCase):

    def setUp(self):
        self.user = BankUser.objects.create_user(user_name='testuser', first_name='test', email='test@example.com', password='testpassword')
        self.account = Account.objects.create(
            account_holder=self.user,
            current_balance=Decimal('1000.00')
        )

    def create_transaction(self, transaction_type, amount, account, note):
        return Transaction.objects.create(
            date=timezone.now(),
            transaction_type=transaction_type,
            amount=amount,
            account=account,
            note=note
        )

    def test_create_credit_transaction(self):
        transaction = self.create_transaction(Transaction.TransactionType.CREDIT, Decimal('200.00'), self.account, 'Test Credit Transaction')
        self.account.refresh_from_db()
        self.assertEqual(self.account.current_balance, Decimal('1200.00'))

    def test_create_debit_transaction(self):
        transaction = self.create_transaction(Transaction.TransactionType.DEBIT, Decimal('150.00'), self.account, 'Test Debit Transaction')
        self.account.refresh_from_db()
        self.assertEqual(self.account.current_balance, Decimal('850.00'))

    def test_transaction_string_representation(self):
        transaction = self.create_transaction(Transaction.TransactionType.CREDIT, Decimal('100.00'), self.account, 'String Representation Test')
        expected_representation = f"{transaction.date} - CREDIT - 100.00"
        self.assertEqual(str(transaction), expected_representation)
