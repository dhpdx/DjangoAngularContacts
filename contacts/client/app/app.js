angular.module('app', ['ngRoute', 'services'])

.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
  })

.controller('homeController', ['$scope', 'Contacts', function($scope, Contacts) {
  $scope.addContact = false;
  $scope.contacts;
  $scope.deleteContacts = [];
  $scope.userSearch = ''
  $scope.deleteSelected = $scope.deleteContacts.length > 0;
  $scope.newContact = {
    phone_number: '',
    name: '',
    imageUrl: ''
  };

  $scope.handleDelete = function() {
    Contacts.deleteContact($scope.deleteContacts[0].id, function(err, resp) {
      if (err) {
        alert('There was a problem')
      } else {
        $scope.updateContacts();
        $scope.deleteSelected = false;
        $scope.deleteContacts = [];
      }
    })
  }

  $scope.updateContacts = function() {
    Contacts.getContacts().then(function(contacts) {
      $scope.contacts = contacts
      console.log('contacts: ', $scope.contacts)
    })
  }

  $scope.handleAddContact = function() {
    $scope.addContact = !$scope.addContact;
  }

  $scope.handlePostContact = function() {
    Contacts.postContact($scope.newContact, function(err, resp) {
      if (err) {
        console.log(err)
        alert(err.data.phone_number)
      } else {
        $scope.newContact = {
          phone_number: '',
          name: '',
          imageUrl: ''
        }
        $scope.addContact = false;
        $scope.updateContacts();
      }
    })
  }

  $scope.handleClick = function(e) {
    console.log('click? ', e.contact)
    if ($scope.deleteContacts.includes(e.contact)) {
      $scope.deleteContacts.splice($scope.deleteContacts.indexOf(e.contact),1)
    } else if ($scope.deleteContacts.length < 1) {
      $scope.deleteContacts.push(e.contact);
    }
    $scope.deleteSelected = $scope.deleteContacts.length > 0;
  }

  $scope.updateContacts();
}]);

angular.module('services', [])
.factory('Contacts', function($http) {
  var getContacts = function() {
    return $http({
    method: 'GET',
    url: '/contacts/',
    }).then(function(resp) {
      return resp.data
    }).catch(function(err) {
      console.error(err)
    })
  }

  var postContact = function(contact, callback) {
    var image = contact.imageUrl || "http://camtech.must.ac.ug/wp-content/uploads/2013/11/default-pic.png";
    return $http({
      method: 'POST',
      url: '/contacts/',
      contentType: 'application/json',
      data: JSON.stringify({
        phone_number: contact.phone_number,
        name: contact.name,
        imageUrl: image
      })
    })
    .then(function(resp) {
      callback(null, resp)
    })
    .catch(function(err) {
      callback(err)
    })
  }

  var deleteContact = function(contact, callback) {
    return $http({
      method: 'DELETE',
      url: '/contacts/' + contact
    })
    .then(function(resp) {
      callback(null, resp);
    })
    .catch(function(err) {
      callback(err)
    })
  }

  return {
    getContacts,
    postContact,
    deleteContact
  }
});