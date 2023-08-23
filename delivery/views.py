from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import DeliveryForm

@csrf_exempt
def create_delivery(request):
    if request.method == "POST":
        form = DeliveryForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({"message": "Delivery information created successfully"})
        else:
            return JsonResponse({"error": "Invalid form data"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)