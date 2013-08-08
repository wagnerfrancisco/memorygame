'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('GameController', ['$scope', function($scope) {
  	$scope.game = memorygame.game();
  }]);