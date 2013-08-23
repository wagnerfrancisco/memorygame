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
				'camera.png', 'drawing.png', 'guitar.png', 'hat.png', 'ink.png', 'kombi.png', 
				'lawyer.png', 'light.png', 'maid.png', 'movie.png', 'old_car.png', 'piano.png', 
				'policeman.png', 'tools.png', 'tshirt.png', 'user.png', 'woman.png', 'world.png'
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
			matches = 0,
			totalMatches = cards.length / 2,
			numberOfTurnedCards = 0,
			isOver = false,

			turnCard = function(card) {
				selectedCards.push(card);
				card.turned = true;
				numberOfTurnedCards++;
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

					matches++;

					if (matches === totalMatches) {
						isOver = true;
					}
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

		that.numberOfMatches = function() {
			return matches;
		};

		that.isOver = function() {
			return isOver;
		};

		that.totalMatches = function() {
			return totalMatches;
		};

		that.numberOfTurnedCards = function() {
			return numberOfTurnedCards;
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