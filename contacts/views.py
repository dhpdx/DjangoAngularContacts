from django.views.generic import TemplateView
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from contacts.models import Contact
from contacts.serializers import ContactSerializer
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import status



def index(request):
  return TemplateView.as_view(template_name="index.html")(request)

@api_view(['GET', 'POST', 'DELETE'])
def contact_list(request):
  if request.method == 'GET':
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

  elif request.method == 'POST':
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'DELETE':
    contact = Contact.objects.get(name=request.data.name)
    contact.delete()
    return Response(status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def contact_detail(request, pk):
  try:
    contact = Contact.objects.get(pk=pk)
  except Contact.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serializer = ContactSerializer(contact)
    return Response(serializer.data)

  elif request.method == 'PUT':
    serializer = ContactSerializer(contact, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'DELETE':
    contact.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
