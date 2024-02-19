from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from .views import AccountList


router = routers.DefaultRouter()
router.register('accounts', AccountList, basename='accounts')
# router.register('transactions', TransactionList, basename='transactions')
urlpatterns  = router.urls
