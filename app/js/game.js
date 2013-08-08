'use strict';

var memorygame = (function() {
	var card = function(spec) {
		var that = {};

		that.image = spec.image;
		that.turned = false;

		return that;
	};

	var deck = function(spec) {
		var that = {};
		var numberOfCards = spec.numberOfCards;
		var cards;		
		var allImages = [
			'camera.png', 'drawing.png', 'hat.png', 'ink.png', 'light.png', 
			'movie.png', 'tools.png', 'tshirt.png', 'world.png'
		];

		var initialize = function() {
			var selectedImages = allImages.slice(0, numberOfCards / 2);
			
			cards = [];

			for (var i = 0, len = selectedImages.length; i < len; i++) {
				cards.push(card({image: selectedImages[i]}));
				cards.push(card({image: selectedImages[i]}));
			}

			cards.shuffle();
		};

		that.getCards = function() {
			return cards;
		};

		initialize();

		return that;
	};

	var game = function(spec) {
		var that = {};		
		var myDeck = spec && spec.deck || deck(spec);
		var cards = myDeck.getCards();

		that.turnCard = function(card) {
			card.turned = !card.turned;
		};

		initializeGrid();
		
		return that;

		function initializeGrid() {
			var lineSize = Math.sqrt(cards.length);
			that.grid = [];
			for (var i = 0; i < lineSize; i++) {
				that.grid[i] = [];
				for (var j = 0; j < lineSize; j++) {
					that.grid[i][j] = cards[i * lineSize +j];
				}
			}
		};
	};

	return {
		card: card,
		deck: deck,
		game: game
	};
}());