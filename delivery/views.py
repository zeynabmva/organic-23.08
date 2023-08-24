from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DeliveryInformationSerializer ,CardInformationSerializer

class CreateDeliveryInformation(APIView):
    def post(self, request, format=None):
        serializer = DeliveryInformationSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class CreateCardInformation(APIView):
    def post(self, request, format=None):
        serializer = CardInformationSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)