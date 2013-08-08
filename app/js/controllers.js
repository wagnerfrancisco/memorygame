'use strict';

/* Controllers */

angular.module('gameApp.controllers', []).
  controller('GameController', ['$scope', function($scope) {
  	$scope.game = memorygame.game({
  		numberOfCards: 16
  	});

  	console.log($scope.game.grid);
  }]);