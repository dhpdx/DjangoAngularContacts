## Contacts

A contacts app using Django and Django's REST Framework with Angular 1.6

### API endpoints
* /contacts/ - Fetch all contacts, Post new contact
* /contacts/1 - Fetch, Update, Delete a contact

### Requirements
* Python
* MySQL Server
* NPM

### Database Config
* start MYSQL - 'mysql.server start'
* Create contacts database - open MySQL shell and enter 'create database contacts'
* settings.py is set by default to run MySQL as the root user with no password. If this needs to be changed for your machine make those changes in settings.py

### Install
* pip install -r requirements.txt
* npm install
* python manage.py migrate

### Run
* python manage.py runserver
- By default the application will be available at localhost:8000
