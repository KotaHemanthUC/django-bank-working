from django.contrib import admin

# Register your models here.
from app_bank.models import Account, Transaction
from django.contrib.auth.admin import UserAdmin

class AccountConfig(admin.ModelAdmin):
    model = Account
    list_display = ('id', 'account_id', 'account_number', 'current_balance', 'account_holder')
    search_fields = ('id', 'account_id', 'account_number', 'current_balance', 'account_holder')
    ordering = ('-account_id',)
    fieldsets = (
        (None, {'fields': ('account_id', 'current_balance', 'account_holder',)}),
    )


class TransactionConfig(admin.ModelAdmin):
    model = Transaction
    list_display = ('id', 'date', 'transaction_type', 'note', 'amount', 'account')
    search_fields = ('id', 'date', 'transaction_type', 'note', 'amount', 'account')
    ordering = ('-date',)
    fieldsets = (
        (None, {'fields': ('date', 'transaction_type', 'note', 'amount', 'account',)}),
    )
    
admin.site.register(Account, AccountConfig)
admin.site.register(Transaction, TransactionConfig)