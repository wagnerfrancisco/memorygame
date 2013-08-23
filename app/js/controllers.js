'use strict';

/* Controllers */

angular.module('gameApp.controllers', []).
  controller('GameController', ['$scope', function($scope) {
  	$scope.numberOfCards = 16;

  	$scope.play = function() {
  		$scope.game = memorygame.game({
	  		numberOfCards: $scope.numberOfCards
	  	});
  	};

  }]);