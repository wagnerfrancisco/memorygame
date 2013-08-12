'use strict';

angular.module('gameApp.services', [])
	.factory('Game', function() {
		return memorygame.game();
	});