function Board(initSquares) {
    'use strict';
    var self = this,
        empty = '';

    self.squares = [[], [], []];

    self.hasFree = function(position) {
        return self.squares[position.x][position.y] === empty;
    };

    self.emptySquares = function() {
        var i, j,
            squares = [];

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (self.hasFree({x:i, y:j}))
                    squares.push({x:i, y:j});
            }
        }
        return squares;
    };

    self.isFull = function() {
        return self.emptySquares().length === 0;
    };

    self.move = function(position, player) {
        self.squares[position.x][position.y] = player;
    };

    function threeInAColumn(player) {
        var i,
            squares = self.squares;
        for (i = 0; i < 3; i++) {
            if (squares[i][0] === player &&
                    squares[i][1] === player &&
                    squares[i][2] === player)
                return true;
        }
        return false;
    }

    function threeInARow(player) {
        var i;
        for (i = 0; i < 3; i++) {
            if (self.squares[0][i] === player &&
                    self.squares[1][i] === player &&
                    self.squares[2][i] === player)
                return true;
        }

        return false;
    }

    function threeInDiagonal(player) {
        if ((self.squares[0][0] === player &&
                self.squares[1][1] === player &&
                self.squares[2][2] === player)
            ||
            (self.squares[2][0] === player &&
                self.squares[1][1] === player &&
                self.squares[0][2] === player))
            return true;

        return false;
    }

    self.threeInline = function(player) {
        return threeInAColumn(player) ||
                threeInARow(player) ||
                threeInDiagonal(player);
    };

    function setup(squares) {
        var x, y;
        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
               self.squares[x][y] = squares[x][y];
            }
        }
    }

    function initialiseEmpty() {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                self.squares[i].push(empty);
            }
        }
    }

    initialiseEmpty();

    if(initSquares) {
        setup(initSquares);
    }
}