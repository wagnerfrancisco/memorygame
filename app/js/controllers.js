'use strict';

/* Controllers */

angular.module('gameApp.controllers', []).
  controller('GameController', ['$scope', function($scope) {
  	$scope.numberOfCards = 16;

  	$scope.modes = memorygame.modes;
  	$scope.currentMode = memorygame.defaultMode;

  	$scope.play = function() {
  		$scope.game = memorygame.game({
	  		mode: $scope.currentMode
	  	});
  	};

  	$scope.selectMode = function(mode) {
  		$scope.currentMode = mode;
  	};

  	$scope.isModeSelected = function(mode) {
  		return mode === $scope.currentMode;
  	};

  	$scope.isEasyMode = function() {
  		return $scope.mode === 'easy';
  	};

  }]);