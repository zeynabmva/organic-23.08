from django.urls import path
from . import views

urlpatterns = [
    # Digər URL-ləri burada əlavə edin
    path('api/create-delivery/', views.create_delivery, name='create-delivery'),
]