from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Contact(models.Model):
  phone_number = PhoneNumberField()
  name = models.CharField(max_length = 50)
  imageUrl = models.CharField(max_length = 255, default="http://camtech.must.ac.ug/wp-content/uploads/2013/11/default-pic.png")
