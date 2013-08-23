'use strict';

var memorygame = (function() {
	var card = function(spec) {
		var that = {
			image: spec.image,
			turned: false,
			match: false
		};

		return that;
	};

	var deck = function(spec) {
		var that = {},
			numberOfCards = spec.numberOfCards,
			cards,
			allImages = [
				'camera.png', 'drawing.png', 'hat.png', 'ink.png', 'light.png', 
				'movie.png', 'tools.png', 'tshirt.png', 'world.png'
			],

			initialize = function() {
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
		var that = {},
			myDeck = spec && spec.deck || deck(spec),
			cards = myDeck.getCards(),
			selectedCards = [],

			turnCard = function(card) {
				selectedCards.push(card);
				card.turned = true;
			},

			unturnCard = function(card) {			
				var index = _.indexOf(selectedCards, card);
				selectedCards.splice(index, 1);
				card.turned = false;
			},

			unturnSelectedCardsIfTheyDontMatch = function() {
				if (selectedCards.length === 2 && 
					selectedCards[0].image !== selectedCards[1].image) {
					unturnCard(selectedCards[1]);
					unturnCard(selectedCards[0]);
				}
			},

			markSelectedCardsAsMatchedIfTheyMatch = function() {
				if (selectedCards.length === 2 && 
					selectedCards[0].image === selectedCards[1].image) {
					selectedCards[0].matched = true;
					selectedCards[1].matched = true;
					selectedCards.splice(0, 2);
				}
			},

			initializeGrid = function() {
				var lineSize = Math.sqrt(cards.length);
				that.grid = [];
				for (var i = 0; i < lineSize; i++) {
					that.grid[i] = [];
					for (var j = 0; j < lineSize; j++) {
						that.grid[i][j] = cards[i * lineSize +j];
					}
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
	};

	return {
		card: card,
		deck: deck,
		game: game
	};
}());