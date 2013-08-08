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
	
});