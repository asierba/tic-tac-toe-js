/*global describe, beforeEach, it, expect, Board, inverse */
'use stric';

describe('when loading the board', function () {
    var board;

    beforeEach(function () {
        board = new Board();
    });

    it('all squares are free', function () {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                expect(board.hasFree({ x: i, y: j})).toBe(true);
            }
        }
    });

    describe('and user takes a square', function () {
        beforeEach(function () {
            board.moveUser({x: 1, y: 0});
        });

        it('square should not be free', function () {
            expect(board.hasFree({ x: 1, y: 0})).toBe(false);
        })

        it('square should be marked with an X', function () {
            expect(board.squares[1][0]).toBe('X');
        });
    });

    describe('and cpu takes a square', function () {
        beforeEach(function () {
            board.moveCpu({x: 2, y: 2});
        });

        it('square should not be free', function () {
            expect(board.hasFree({ x: 2, y: 2})).toBe(false);
        })

        it('square should be marked with an O', function () {
            expect(board.squares[2][2]).toBe('O');
        });
    });
});

describe('when user makes three in a row', function () {
    var board;

    beforeEach(function () {
        board = new Board(inverse([
            ['' ,'X' ,'O'],
            ['' ,'X' ,'O'],
            ['' ,'X' ,'']]));
    });

    it('user should win', function () {
        expect(board.userWins()).toBe(true);
    });
});

describe('when cpu makes three in a row', function () {
    var board;

    beforeEach(function () {
        board = new Board(inverse([
            ['X','X' ,''],
            ['O','O','O'],
            ['' ,'X','']]));
    });

    it('cpu should win', function () {
        expect(board.cpuWins()).toBe(true);
    });
});

describe('when no more free spaces', function () {
    var board;

    beforeEach(function () {
        board = new Board(inverse([
            ['X' ,'O' ,'X'],
            ['X' ,'O' ,'X'],
            ['O' ,'X' ,'O']]));
    });

    it('board should be full', function () {
        expect(board.isFull()).toBe(true);
    });

    describe('and user resets the board', function () {
        beforeEach(function () {
            board.reset();
        });

        it('board should not be full', function () {
            expect(board.isFull()).not.toBe(true);
        });


        it('all squares should be empty' , function () {
            board.reset();

            expect(board.emptySquares().length).toBe(9);
        });

    });
});

describe('when just one space free', function () {
    var board;

    beforeEach(function () {
        board = new Board(inverse([
            ['X' ,'O' ,'X'],
            ['X' ,'O' ,'X'],
            ['' ,'X' ,'O']]));
    });

    it('that square should be marked as empty', function () {
        expect(board.emptySquares()[0]).toEqual({ x: 0, y: 2});
    });
});