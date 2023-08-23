from django import forms
from .models import DeliveryInformation

class DeliveryForm(forms.ModelForm):
    class Meta:
        model = DeliveryInformation
        fields = '__all__'  # Və ya yalnızca göndərmək istədiyiniz sahələri qeyd edin