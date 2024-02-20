from django.db import models
from django.conf import settings
import uuid

def create_account_number():
    # Fetch the highest account_id or 0 if no Accounts exist yet
    max_id = Account.objects.aggregate(max_id=models.Max('id')).get('max_id', 0)
    if max_id is None: max_id = 0
    # Format the new account_id as A-0001, A-0002, etc. by incrementing the max_id and padding with zeros
    new_account_number = f"A-{max_id + 1:04d}"
    return new_account_number

class Account(models.Model):

    # NOTE: I would normally use a UUID for a primary key, but the excercise mockup uses an AutoField integer

    account_number = models.UUIDField(default=uuid.uuid4, editable=False)
    account_id = models.CharField(max_length=20, default=create_account_number, unique=True)
    account_holder = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='accounts', on_delete=models.CASCADE)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):  
        return self.account_number


class TransactionType(models.TextChoices):
    CREDIT = 'CREDIT', 'Credit'
    DEBIT = 'DEBIT', 'Debit'

class Transaction(models.Model):
    date = models.DateTimeField()
    transaction_type = models.CharField(max_length=6, choices=TransactionType.choices)
    note = models.TextField()
    # decimal with max 10 digits and 2 decimal places for currency
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account = models.ForeignKey(Account, to_field='account_id', related_name='transactions', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date} - {self.transaction_type} - {self.amount}"
