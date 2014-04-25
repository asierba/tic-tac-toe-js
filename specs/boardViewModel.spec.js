/*global describe, beforeEach, BoardViewModel, it, expect, jasmine, spyOn, Game */

'use scrict';

describe('when first time loading the board', function() {
    var boardViewModel;

    beforeEach(function () {
        var board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree', 'gameIsOver']);

        boardViewModel = new BoardViewModel(board);
    });

    it('there shouldn\'t be a result', function () {
        expect(boardViewModel.result()).toBe('');
    });
});

describe('when user clicks in an empty square', function () {
    var board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree', 'gameIsOver']);
        board.hasFree.and.returnValue(true);
        board.gameIsOver.and.returnValue(false);

        spyOn(Game, 'getBestPosition');

        var boardViewModel = new BoardViewModel(board);

        boardViewModel.move({x: 1, y: 0});
    });

    it('should be taken by the user', function () {
        expect(board.moveUser).toHaveBeenCalledWith({x: 1, y: 0});
    });

    it('cpu should take another square', function () {
        expect(board.moveCpu).toHaveBeenCalled();
    });
});

describe('when user clicks in a non empty square', function () {
    var board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree', 'gameIsOver']);
        board.hasFree.and.returnValue(false);
        var boardViewModel = new BoardViewModel(board);

        boardViewModel.move({x: 1, y: 1});
    });

    it('should not be taken by the user', function () {
        expect(board.moveUser).not.toHaveBeenCalled();
    });

    it('cpu should not take another square', function () {
        expect(board.moveCpu).not.toHaveBeenCalled();
    });
});

describe('when game is over and there are free spaces', function() {
    var boardViewModel,
        board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree', 'gameIsOver']);
        
        board.gameIsOver.and.returnValue(true);
        board.hasFree.and.returnValue(true);

        boardViewModel = new BoardViewModel(board);
    });

    it('user and cpu shouldn\'t be able to make more moves', function() {
        boardViewModel.move({x: 0, y: 0});

        expect(board.moveUser).not.toHaveBeenCalled();
        expect(board.moveCpu).not.toHaveBeenCalled();
    });

    describe('and user has won', function () {
        beforeEach(function () {
            board.userWins.and.returnValue(true);

            boardViewModel = new BoardViewModel(board);
        });
        
        it('there should be a user wins result', function () {
            expect(boardViewModel.result()).toBe('You win!');
        });
    });

    describe('and cpu has won', function () {
        beforeEach(function () {
            board.cpuWins.and.returnValue(true);

            boardViewModel = new BoardViewModel(board);
        });

        it('there should be a cpu wins result', function () {
            expect(boardViewModel.result()).toBe('You lose!');
        });
    });
});

describe('when game is over after user click', function() {
     var boardViewModel,
        board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree', 'gameIsOver']);
        
        board.gameIsOver.and.returnValue(false);
        board.hasFree.and.returnValue(true);

        board.moveUser.and.callFake(function() {
            board.gameIsOver.and.returnValue(true);
        });

        boardViewModel = new BoardViewModel(board);

        boardViewModel.move({x: 1, y: 1});
    });

    it('cpu shouln\'t make a move', function() {
        expect(board.moveCpu).not.toHaveBeenCalled();
    });
});