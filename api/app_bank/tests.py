from django.test import TestCase

# Create your tests here.
from app_bank.models import Account, Transaction
from django.contrib.auth.models import User

class Test_Create_Account(TestCase):

    @classmethod
    def setUpTestData(cls):
        Account.objects.create(account_id='1', account_number='1234567890', current_balance='1000', account_holder='John Doe')
        User.objects.create(username='john', password='john123')

    def test_account(self):
        account = Account.objects.get(account_id='1')
        self.assertEqual(account.account_id, '1')
        self.assertEqual(account.account_number, '1234567890')
        self.assertEqual(account.current_balance, '1000')
        self.assertEqual(account.account_holder, 'John Doe')
        