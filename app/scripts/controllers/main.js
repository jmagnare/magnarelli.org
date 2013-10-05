'use strict';

angular.module('magnarelli.orgApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      ['Github', "http://www.github.com/jmagnare"],
      ['LinkedIn', "http://www.linkedin.com/in/jmagnare"],
      ['Resume', "misc/newresume.pdf"]
    ];
  });
