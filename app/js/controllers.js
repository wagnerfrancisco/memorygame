'use strict';

/* Controllers */

angular.module('gameApp.controllers', []).
  controller('GameController', ['$scope', function($scope) {
  	$scope.modes = memorygame.modes;
  	$scope.currentMode = memorygame.defaultMode;

  	$scope.play = function() {
  		$scope.game = memorygame.game({
	  		mode: $scope.currentMode
	  	});
  	};

    $scope.finalizeGame = function() {
      $scope.game = null;
    };

  	$scope.selectMode = function(mode) {
  		$scope.currentMode = mode;
  	};

  	$scope.isModeSelected = function(mode) {
  		return mode === $scope.currentMode;
  	};

  }]);