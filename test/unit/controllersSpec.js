'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('gameApp.controllers'));

  describe('GameController', function() {
  	var scope, ctrl;

  	beforeEach(inject(function($rootScope, $controller) {
  		scope = $rootScope;
  		ctrl = $controller('GameController', {$scope: $rootScope});
  	}));

  	it('should select mode', inject(function() {
    	var mode = 'easy';
    	scope.selectMode(mode);
    	expect(scope.isModeSelected(mode)).toBeTruthy();
  	}));

  	it('should start game', function() {
  		expect(scope.game).toBeUndefined();
  		scope.play();
  		expect(scope.game).not.toBeUndefined();
  	});

  	it('should finalize game', function() {
  		scope.play();
  		expect(scope.game).not.toBeFalsy();

  		scope.finalizeGame();
  		expect(scope.game).toBeFalsy();
  	});

  });

});
