from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^contacts/$', views.contact_list),
    url(r'^contacts/(?P<pk>[0-9]+)/$', views.contact_detail),    
]
