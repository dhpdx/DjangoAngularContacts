from rest_framework import serializers
from contacts.models import Contact

class ContactSerializer(serializers.ModelSerializer):
  class Meta:
    model = Contact
    fields = ('id', 'phone_number', 'name', 'imageUrl')

