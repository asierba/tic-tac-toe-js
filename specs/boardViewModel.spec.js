/*global describe, beforeEach, BoardViewModel, it, expect */

BoardViewModel.prototype.setup = function (squares) {
    var x, y;
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {
           this.squares[x][y](squares[y][x]);
        }
    }
};

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
            board.move({x: 1, y: 0});
        });

        it('should be marked with an X', function () {
            expect(board.squares[1][0]()).toBe('X');
        });

        it('game is not ended yet', function () {
            expect(board.result()).toBe('');
        });
    });
});

describe('when user clicks in a non empty square', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.setup([
            ['' ,'' ,''],
            ['' ,'' ,''],
            ['' ,'' ,'']]);
        board.squares[1][1]('O');

        board.move({x: 1, y: 1});
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
        board.setup([
            ['' ,'' ,''],
            ['' ,'X',''],
            ['' ,'' ,'O']]);

        board.move({x: 0, y: 1});
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
        board.setup([
            ['' ,'' ,''],
            ['' ,'X','O'],
            ['' ,'' ,'']]);

        board.move({x: 0, y: 1});
    });

    it('should take that square', function () {
        expect(board.squares[0][1]()).toBe('X');
    });

    it('cpu should not take already taken square', function () {
        expect(board.squares[1][1]()).not.toBe('O');
    });
});

describe('when user clicks in square next to four taken squares', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.setup([
            ['' ,'' ,''],
            ['X','X' ,'O'],
            ['O' ,'' ,'']]);

        board.move({x: 2, y: 0});
    });

    it('should take that square', function () {
        expect(board.squares[2][0]()).toBe('X');
    });

    it('cpu should not take already taken square', function () {
        expect(board.squares[0][1]()).not.toBe('O');
    });
});

describe('when no more free spaces to be taken by cpu', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        board.setup([
            ['X' ,'O' ,'X'],
            ['X' ,'O' ,'X'],
            ['O' ,'' ,'O']]);

        board.move({x: 1, y: 2});
    });

    it('game should end with draw', function () {
        expect(board.result()).toBe('Draw');
    });
});

describe('when user makes three in a row', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();

        board.setup([
            ['' ,'X' ,'O'],
            ['' ,'X' ,'O'],
            ['' ,'' ,'']]);

        board.move({x: 1, y: 2});
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
        
        board.setup([
                ['X','' ,''],
                ['' ,'O','O'],
                ['' ,'X','']]);        

        board.move({x: 2, y: 0});
    });

    it('cpu should win', function () {
        expect(board.result()).toBe('You lose!');
    });
});

describe('when user makes two in a column', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['X','O',''],
                ['' ,'' ,''],
                ['' ,'' ,'']]);        

        board.move({x: 0, y: 1});
    });

    it('cpu should take next in column to avoid user winning', function () {
        expect(board.squares[0][2]()).toBe('O');
    });
});

describe('when user makes two in a column v2', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['', 'X',''],
                ['' ,'' ,''],
                ['' ,'' ,'']]);

        board.move({x: 1, y: 1});
    });

    it('cpu should take next square to avoid user winning', function () {
        expect(board.squares[1][2]()).toBe('O');
    });
});

describe('when user makes two in a column v3', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['', '', 'X'],
                ['' ,'' ,''],
                ['' ,'' ,'']]);

        board.move({x: 2, y: 1});
    });

    it('cpu should take next square to avoid user winning', function () {
        expect(board.squares[2][2]()).toBe('O');
    });
});

describe('when user makes two in a column v4', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['', '', ''],
                ['' ,'' ,'X'],
                ['' ,'' ,'']]);

        board.move({x: 2, y: 2});
    });

    it('cpu should take next square to avoid user winning', function () {
        expect(board.squares[2][0]()).toBe('O');
    });
});

describe('when user makes two in a column v5', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['', '', ''],
                ['X' ,'' ,''],
                ['' ,'' ,'']]);

        board.move({x: 0, y: 2});
    });

    it('cpu should take next square to avoid user winning', function () {
        expect(board.squares[0][0]()).toBe('O');
    });
});

describe('when user makes two in a column in corners', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['X', '', ''],
                ['' ,'' ,''],
                ['' ,'' ,'']]);

        board.move({x: 0, y: 2});
    });

    it('cpu should take next square to avoid user winning', function () {
        expect(board.squares[0][1]()).toBe('O');
    });
});

describe('when user makes two in a row', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['' ,'' ,''],
                ['' ,'','X'],
                ['O' ,'','']]);

        board.move({x: 1, y: 1});
    });

    it('cpu should take next in row to avoid user winning', function () {
        expect(board.squares[0][1]()).toBe('O');
    });
});

describe('when user makes two in a row in corners', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['O','' ,''],
                ['' ,'' ,''],
                ['X','','']]);

        board.move({x: 2, y: 2});
    });

    it('cpu should take next in row to avoid user winning', function () {
        expect(board.squares[1][2]()).toBe('O');
    });
});

describe('when user makes two in a diagonal', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['' ,'','X'],
                ['O','',''],
                ['' ,'','']]);

        board.move({x: 1, y: 1});
    });

    it('cpu should take next in diagonal to avoid user winning', function () {
        expect(board.squares[0][2]()).toBe('O');
    });
});

describe('when user makes two in a diagonal v2', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();
        
        board.setup([
                ['X','O',''],
                ['','',''],
                ['' ,'','']]);

        board.move({x: 1, y: 1});
    });

    it('cpu should take next in diagonal to avoid user winning', function () {
        expect(board.squares[2][2]()).toBe('O');
    });
});

describe('when middle square free', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();

        board.move({x: 2, y: 2});
    });

    it('cpu should take it', function () {
        expect(board.squares[1][1]()).toBe('O');
    });    
});

describe('when middle square is not free', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();

        board.move({x: 1, y: 1});
    });

    it('cpu should take one in the corner', function () {
        expect(board.squares[0][0]()).toBe('O');
    });
});

describe('when middle and first corner corner are not free', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();

        board.setup([
                ['X','' ,''],
                ['' ,'O',''],
                ['' ,'' ,'']]);

        board.move({x: 2, y: 2});
    });

    it('cpu should take one in the next corner', function () {
        expect(board.squares[2][0]()).toBe('O');
    });
});

describe('when cpu has chance to make three in diagonal', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();

        board.setup([
                ['X','' ,'O'],
                ['' ,'O',''],
                ['' ,'' ,'X']]);

        board.move({x: 1, y: 0});
    });

    it('cpu should take make three in diagonal', function () {
        expect(board.squares[0][2]()).toBe('O');
    });

    it('cpu wins', function () {
        expect(board.result()).toBe('You lose!');
    });
});

describe('when cpu has chance to make three in a row', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();

        board.setup([
                ['','O' ,'O'],
                ['' ,'' ,'X'],
                ['' ,'' ,'X']]);

        board.move({x: 1, y: 1});
    });

    it('cpu should take make three in a row', function () {
        expect(board.squares[0][0]()).toBe('O');
    });

    it('cpu wins', function () {
        expect(board.result()).toBe('You lose!');
    });
});

describe('when cpu has chance to make three in a column', function () {
    var board;

    beforeEach(function () {
        board = new BoardViewModel();

        board.setup([
                ['' ,'' ,'O'],
                ['X','' ,'O'],
                ['X' ,'' ,'']]);

        board.move({x: 1, y: 1});
    });

    it('cpu should take make three in a row', function () {
        expect(board.squares[2][2]()).toBe('O');
    });

    it('cpu wins', function () {
        expect(board.result()).toBe('You lose!');
    });
});
