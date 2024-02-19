from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from app_bank import views


urlpatterns = [
    path('accounts/', views.AccountList.as_view()),
    path('accounts/<str:pk>/', views.AccountDetail.as_view()),
]