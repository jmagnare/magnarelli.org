'use strict';

angular.module('magnarelli.orgApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
        .when('/whatdone', {
            templateUrl: 'views/whatdone.html'
        })
        .when('/whatlike', {
            templateUrl: 'views/whatlike.html'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
