/*global describe, beforeEach, Game, it, expect, jasmine, spyOn, CpuLogic */

'use scrict';

describe('when first time loading the board', function () {
    var game,
        board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree']);
        board.hasFree.and.returnValue(true);

        spyOn(CpuLogic, 'getBestPosition');

        game = new Game(board);
    });

    it('there shouldn\'t be a result', function () {
        expect(game.result()).toBe('');
    });

    it('user hasn\'t made a move', function () {
        expect(board.moveUser).not.toHaveBeenCalled();
    });

    it('cpu hasn\'t made a move', function () {
        expect(board.moveCpu).not.toHaveBeenCalled();
    });
});

describe('when user clicks in an empty square', function () {
    var board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree']);
        board.hasFree.and.returnValue(true);

        spyOn(CpuLogic, 'getBestPosition');

        var game = new Game(board);

        game.doMove({x: 1, y: 0});
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
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree']);
        board.hasFree.and.returnValue(false);
        var game = new Game(board);

        game.doMove({x: 1, y: 1});
    });

    it('should not be taken by the user', function () {
        expect(board.moveUser).not.toHaveBeenCalled();
    });

    it('cpu should not take another square', function () {
        expect(board.moveCpu).not.toHaveBeenCalled();
    });
});

describe('when there are free spaces', function() {
    var game,
        board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree']);
        
        board.hasFree.and.returnValue(true);
    });
    

    describe('but user has won', function () {
        beforeEach(function () {
            board.userWins.and.returnValue(true);

            game = new Game(board);
        });
        
        it('there should be a user wins result', function () {
            expect(game.result()).toBe('You win!');
        });

        it('user and cpu shouldn\'t be able to make more moves', function() {
            game.doMove({x: 0, y: 0});

            expect(board.moveUser).not.toHaveBeenCalled();
            expect(board.moveCpu).not.toHaveBeenCalled();
        });
    });

    describe('but cpu has won', function () {
        beforeEach(function () {
            board.cpuWins.and.returnValue(true);

            game = new Game(board);
        });

        it('there should be a cpu wins result', function () {
            expect(game.result()).toBe('You lose!');
        });

        it('user and cpu shouldn\'t be able to make more moves', function() {
            game.doMove({x: 0, y: 0});

            expect(board.moveUser).not.toHaveBeenCalled();
            expect(board.moveCpu).not.toHaveBeenCalled();
        });
    });

    describe('but board isFull', function () {
        beforeEach(function () {
            board.isFull.and.returnValue(true);

            game = new Game(board);
        });

        it('there should be a draw result', function () {
            expect(game.result()).toBe('Draw');
        });

        it('user and cpu shouldn\'t be able to make more moves', function() {
            game.doMove({x: 0, y: 0});

            expect(board.moveUser).not.toHaveBeenCalled();
            expect(board.moveCpu).not.toHaveBeenCalled();
        });
    });
});

describe('when game is over after user click', function() {
    var game,
        board;

    beforeEach(function () {
        board = jasmine.createSpyObj('board', 
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree']);
        
        board.hasFree.and.returnValue(true);

        board.moveUser.and.callFake(function() {
            board.userWins.and.returnValue(true);
        });

        game = new Game(board);

        game.doMove({x: 1, y: 1});
    });

    it('cpu shouln\'t make a move', function() {
        expect(board.moveCpu).not.toHaveBeenCalled();
    });
});


describe('when restarting the board with cpu as starting player', function () {
    var game,
        board,
        cpuMove = { x: 1, y: 2 };

    beforeEach(function () {
        board = jasmine.createSpyObj('board',
            ['moveUser', 'moveCpu', 'userWins', 'isFull', 'cpuWins', 'hasFree', 'reset']);
        board.hasFree.and.returnValue(true);

        spyOn(CpuLogic, 'getBestPosition').and.returnValue(cpuMove);

        game = new Game(board);

        var userStarting = false;
        game.restart();
    });

    it('user hasn\'t made a move', function () {
        expect(board.moveUser).not.toHaveBeenCalled();
    });

    it('cpu has made a move', function () {
        expect(board.moveCpu).toHaveBeenCalled();
        expect(board.moveCpu).toHaveBeenCalledWith(cpuMove);
    });
});
