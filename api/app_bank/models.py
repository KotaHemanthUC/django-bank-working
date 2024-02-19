from django.db import models
from django.conf import settings
import uuid

class Account(models.Model):
    # using UUID as primary key for better security
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account_id = models.CharField(max_length=10, unique=True)
    account_number = models.CharField(max_length=20)
    account_holder = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='accounts', on_delete=models.CASCADE)

    # not sure if this is the best way to generate account_id
    def save(self, *args, **kwargs):
        if not self.account_id:
            max_id = Account.objects.aggregate(max_id=models.Max('account_id'))['max_id']
            self.account_id = f"A-{int(max_id.split('-')[-1]) + 1:04d}" if max_id else "A-0001"
        super().save(*args, **kwargs)
    
    def current_balance(self):
        # get the sum of all transactions
        return self.transactions.aggregate(balance=models.Sum('amount'))['balance'] or 0


    def __str__(self):
        return self.account_id

class TransactionType(models.TextChoices):
    CREDIT = 'CREDIT', 'Credit'
    DEBIT = 'DEBIT', 'Debit'

class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # Could use human-readable name here for date as well
    date = models.DateTimeField()
    transaction_type = models.CharField(max_length=6, choices=TransactionType.choices)
    note = models.TextField()
    # decimal with max 10 digits and 2 decimal places for currency
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account = models.ForeignKey(Account, related_name='transactions', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date} - {self.transaction_type} - {self.amount}"
