from users.models import BankUser
from rest_framework import status
from rest_framework.test import APITestCase
from django.test import TestCase
from decimal import Decimal
from ..models import Account

class AccountAPITestCase(APITestCase):

    def setUp(self):
        # Create a test user for account operations
        self.user = BankUser.objects.create_user(
            user_name='testaccount',
            first_name='account',
            email='accounttest@example.com',
            password='testpassword'
        )
        self.creds = self.authenticate_user(email='accounttest@example.com', password='testpassword')

    def authenticate_user(self, email, password):
        # Helper method to authenticate a user and return auth header
        auth_data = {'email': email, 'password': password}
        response = self.client.post('/api/token/', auth_data, format='json')
        token = response.data['access']
        return {'HTTP_AUTHORIZATION': 'JWT ' + token}

    def create_account(self, account_holder_id, current_balance='1000.00'):
        # Helper method to create an account and return the response
        data = {
            'account_holder': account_holder_id,
            'current_balance': current_balance
        }
        return self.client.post('/bank/accounts/', data, format='json', **self.creds)

    def test_account_creation(self):
        # Test account creation via API
        response = self.create_account(self.user.id)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        account_id = response.data['account_id']
        account = Account.objects.get(account_id=account_id)
        self.assertEqual(account.current_balance, Decimal('1000.00'))

    def test_account_list(self):
        # Test listing accounts via API
        self.create_account(self.user.id)  
        response = self.client.get('/bank/accounts/', **self.creds)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class AccountModelTestCase(TestCase):

    def setUp(self):
        # Create a test user and account for model tests
        self.user = BankUser.objects.create_user(user_name='modeltestuser', first_name='modeltest', email='modeltest@example.com', password='modeltestpassword')
        self.account = Account.objects.create(
            account_holder=self.user,
            current_balance=Decimal('2000.00') 
        )

    def test_account_creation(self):
        # Test Account model creation and attributes
        self.assertIsInstance(self.account, Account)
        self.assertEqual(self.account.current_balance, Decimal('2000.00'))

    def test_account_update_balance(self):
        # Test updating an account's balance
        self.account.current_balance += Decimal('500.00')
        self.account.save()
        updated_account = Account.objects.get(pk=self.account.pk)
        self.assertEqual(updated_account.current_balance, Decimal('2500.00'))

    def test_account_string_representation(self):
        # Assuming Account model has a __str__ method that returns account_number
        expected_representation = str(self.account.account_number)
        self.assertEqual(str(self.account), expected_representation)
