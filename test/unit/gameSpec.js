'use strict';

describe('game', function() {	

	describe('init', function() {
		var game, mockedDeck;

		beforeEach(function() {
			mockedDeck = {
				getCards: function() {
					return [
						memorygame.card({image: 'a'}),
						memorygame.card({image: 'b'}),
						memorygame.card({image: 'a'}),
						memorygame.card({image: 'b'}),
					];
				}
			};

			game = memorygame.game({
				deck: mockedDeck
			});
		});

		it('should create game with 2x2 grid', function() {
			expect(game.grid.length).toBe(2);
			expect(game.grid[0].length).toBe(2);
			expect(game.grid[1].length).toBe(2);
		});
		
		it('should initialize cards', function() {
			expect(game.grid[0][0].image).toBe('a');
			expect(game.grid[0][1].image).toBe('b');
			expect(game.grid[1][0].image).toBe('a');
			expect(game.grid[1][1].image).toBe('b');
		});

		it('should initialize with cards not turned', function() {
			expect(game.grid[0][0].turned).toBe(false);
			expect(game.grid[0][1].turned).toBe(false);
			expect(game.grid[1][0].turned).toBe(false);
			expect(game.grid[1][1].turned).toBe(false);
		});

		it('should turn card', function() {
			var card = game.grid[0][0];
			
			expect(card.turned).toBe(false);
			game.turnCard(card);
			expect(card.turned).toBe(true);
			game.turnCard(card);
			expect(card.turned).toBe(false);
		});

		it('should not turn matched card', function() {
			var card = game.grid[0][0];
			card.matched = true;
			
			expect(card.turned).toBe(false);
			game.turnCard(card);
			expect(card.turned).toBe(false);
		});

		it('should not turn cards if they are selected', function() {
			var card = game.grid[0][0];
		});

		it('should turn the selected cards back if they dont match', function() {
			var card1 = game.grid[0][0];
			var card2 = game.grid[0][1];
			var card3 = game.grid[1][0];

			expect(card1.turned).toBe(false);
			expect(card2.turned).toBe(false);
			expect(card3.turned).toBe(false);

			game.turnCard(card1);
			game.turnCard(card2);
			game.turnCard(card3);

			expect(card1.turned).toBe(false);
			expect(card2.turned).toBe(false);
			expect(card3.turned).toBe(true);
		});

		it('should no turn the selected cards back if they match', function() {
			var card1 = game.grid[0][0];
			var card2 = game.grid[1][0];
			var card3 = game.grid[0][1];

			expect(card1.turned).toBe(false);
			expect(card2.turned).toBe(false);
			expect(card3.turned).toBe(false);

			game.turnCard(card1);
			game.turnCard(card2);
			game.turnCard(card3);

			expect(card1.turned).toBe(true);
			expect(card2.turned).toBe(true);
			expect(card3.turned).toBe(true);
		});

		it('should mark card as matched after matching', function() {
			var card1 = game.grid[0][0];
			var card2 = game.grid[1][0];

			expect(card1.turned).toBe(false);
			expect(card2.turned).toBe(false);

			game.turnCard(card1);
			game.turnCard(card2);

			expect(card1.turned).toBe(true);
			expect(card1.matched).toBe(true);

			expect(card2.turned).toBe(true);
			expect(card2.matched).toBe(true);
		});

	});

});

describe('deck', function() {
	it('should create deck with 10 cards', function() {
		var deck = memorygame.deck({
			numberOfCards: 4
		});

		expect(deck.getCards().length).toBe(4);
	});

	it('should create pairs of cards', function() {
		var deck = memorygame.deck({
			numberOfCards: 2
		});

		var cards = deck.getCards();
		expect(cards.length).toBe(2);
		expect(cards[0]).toEqual(cards[1]);
	})
});