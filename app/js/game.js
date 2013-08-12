'use strict';

var memorygame = (function() {
	var card = function(spec) {
		var that = {};

		that.image = spec.image;
		that.turned = false;
		that.match = false;

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
		var selectedCards = [];

		var turnCard = function(card) {
			selectedCards.push(card);
			card.turned = true;
		};

		var unturnCard = function(card) {			
				var index = _.indexOf(selectedCards, card);
				selectedCards.splice(index, 1);
				card.turned = false;
		};

		var unturnSelectedCardsIfTheyDontMatch = function() {
			if (selectedCards.length === 2 && 
				selectedCards[0].image !== selectedCards[1].image) {
				unturnCard(selectedCards[1]);
				unturnCard(selectedCards[0]);
			}
		};

		var markSelectedCardsAsMatchedIfTheyMatch = function() {
			if (selectedCards.length === 2 && 
				selectedCards[0].image === selectedCards[1].image) {
				selectedCards[0].matched = true;
				selectedCards[1].matched = true;
				selectedCards.splice(0, 2);
			}
		};

		that.turnCard = function(card) {
			if (card.matched) {
				return;
			}

			var unturning = card.turned;

			if (unturning) {
				unturnCard(card);
				return;
			}

			unturnSelectedCardsIfTheyDontMatch();
			turnCard(card);
			markSelectedCardsAsMatchedIfTheyMatch();
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