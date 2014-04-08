/*global describe, beforeEach, BoardViewModel, it, expect */
describe('when loading the board', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
    });

    it('all squares are free', function () {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                expect(board.squares[i][j]()).toBe('');
            }
        }
    });

    describe('and user clicks in a square', function () {
        beforeEach(function () {
            board.move(1, 0);
        });

        it('should be marked with an X', function () {
            expect(board.squares[1][0]()).toBe('X');
        });

        it('following square should be marked with an O', function () {
            expect(board.squares[2][0]()).toBe('O');
        });

        it('game is not ended yet', function () {
            expect(board.result()).toBe('');
        });
    });

    describe('and user clicks in the last square of the board', function () {
        beforeEach(function () {
            board.move(2, 2);
        });

        it('should be marked with an X', function () {
            expect(board.squares[2][2]()).toBe('X');
        });

        it('first square should be marked with an O', function () {
            expect(board.squares[0][0]()).toBe('O');
        });
    });
});

describe('when user clicks in a non empty square', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.squares[1][1]('O');

        board.move(1, 1);
    });

    it('should not take that square', function () {
        expect(board.squares[1][1]()).not.toBe('X');
    });

    it('cpu should not make a move', function () {
        expect(board.squares[2][1]()).not.toBe('O');
    });
});

describe('when user clicks in square next to a non empty square', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.squares[1][1]('X');
        board.squares[2][2]('O');

        board.move(0, 1);
    });

    it('should take that square', function () {
        expect(board.squares[0][1]()).toBe('X');
    });

    it('cpu should not take already taken square', function () {
        expect(board.squares[1][1]()).not.toBe('O');
    });

    it('cpu should take the next available', function () {
        expect(board.squares[2][1]()).toBe('O');
    });
});

describe('when user clicks in square next to two taken squares', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.squares[1][1]('X');
        board.squares[2][1]('O');

        board.move(0, 1);
    });

    it('should take that square', function () {
        expect(board.squares[0][1]()).toBe('X');
    });

    it('cpu should not take already taken square', function () {
        expect(board.squares[1][1]()).not.toBe('O');
    });

    it('cpu should take the next available', function () {
        expect(board.squares[0][2]()).toBe('O');
    });
});

describe('when user clicks in square next to four taken squares', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.squares[0][1]('X');
        board.squares[1][1]('O');
        board.squares[2][1]('X');
        board.squares[0][2]('O');

        board.move(2, 0);
    });

    it('should take that square', function () {
        expect(board.squares[2][0]()).toBe('X');
    });

    it('cpu should not take already taken square', function () {
        expect(board.squares[0][1]()).not.toBe('O');
    });

    it('cpu should take the next available', function () {
        expect(board.squares[1][2]()).toBe('O');
    });
});

describe('when no more free spaces to be taken by cpu', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.squares[0][0]('X');
        board.squares[1][0]('O');
        board.squares[2][0]('X');
        board.squares[0][1]('X');
        board.squares[1][1]('O');
        board.squares[2][1]('X');
        board.squares[0][2]('O');
        board.squares[2][2]('O');

        board.move(1, 2);
    });

    it('game should end with draw', function () {
        expect(board.result()).toBe('Draw');
    });
});

describe('when user makes three in a row', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.squares[1][0]('X');
        board.squares[2][0]('O');
        board.squares[1][1]('X');
        board.squares[2][1]('O');

        board.move(1, 2);
    });

    it('user should win', function () {
        expect(board.result()).toBe('You win!');
    });

    it('cpu should not make move', function () {
        expect(board.squares[2][2]()).not.toBe('O');
    });
});

describe('when cpu makes three in a row', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.squares[0][0]('X');
        board.squares[1][0]('');
        //board.squares[2][0]('');
        board.squares[0][1]('');
        board.squares[1][1]('O');
        board.squares[2][1]('O');
        board.squares[0][2]('');
        board.squares[1][2]('X');
        board.squares[2][2]('');

        board.move(2, 0);
    });

    it('cpu should win', function () {
        expect(board.result()).toBe('You lose!');
    });
});