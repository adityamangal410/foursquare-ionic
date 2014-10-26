angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('VenuesCtrl', function($scope, $stateParams, $http) {

  $scope.venues = [];

  var CLIENT_ID = "W2DSL0SO3R5TG2VZG5A2A20I3LJEGZZR2OCRH0KIDXHKX04X";
  var CLIENT_SECRET = "1BNQUYNUASFOJ34BCLROWAW1KH5SU4FB0XSPAJHBYTEEMR3O";
  var CATEGORY_ID = "4bf58dd8d48988d10f941735";
  var radius = "3000";
  var intent = "browse";
  
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  today = ''+yyyy+mm+dd;

  $http
        .get('https://api.foursquare.com/v2/venues/search?near=' + $stateParams.location + '&radius=' + radius + '&intent=' + intent + '&categoryId=' + CATEGORY_ID + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + today, {cache: true})
        .then(function(response){
          // console.log(response);
          $scope.venues = response.data.response.venues;
        });

        $scope.doRefresh = function() {
          $http
            .get('https://api.foursquare.com/v2/venues/search?near=' + $stateParams.location + '&radius=' + radius + '&intent=' + intent + '&categoryId=' + CATEGORY_ID + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + today, {cache: true})
            .then(function(response) {
                // console.log(response);
                $scope.venues = response.data.response.venues;
              })
              .finally(function() {
                $scope.$broadcast('scroll.refreshComplete')
              })
        }
  
})

.controller('VenueCtrl', function($scope, $stateParams, $http) {
  $scope.venue = {};

  var CLIENT_ID = "W2DSL0SO3R5TG2VZG5A2A20I3LJEGZZR2OCRH0KIDXHKX04X";
  var CLIENT_SECRET = "1BNQUYNUASFOJ34BCLROWAW1KH5SU4FB0XSPAJHBYTEEMR3O";
  var CATEGORY_ID = "4bf58dd8d48988d10f941735";
  
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  today = ''+yyyy+mm+dd;
  $http
        .get('https://api.foursquare.com/v2/venues/' + $stateParams.venueId + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + today, {cache: true})
        .then(function(response){
          // console.log(response);
          $scope.venue = response.data.response.venue;
          $scope.image1 = $scope.venue.photos.groups[0].items[0].prefix + $scope.venue.photos.groups[0].items[0].width + 'x' + $scope.venue.photos.groups[0].items[0].height + $scope.venue.photos.groups[0].items[0].suffix;
          $scope.image2 = $scope.venue.photos.groups[0].items[1].prefix + $scope.venue.photos.groups[0].items[1].width + 'x' + $scope.venue.photos.groups[0].items[1].height + $scope.venue.photos.groups[0].items[1].suffix;
        });
})

