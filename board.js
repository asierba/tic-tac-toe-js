function Board(initSquares) {
    'use strict';
    var self = this,
        empty = '',
        USER = 'X',
        CPU = 'O',
        DEFAULT_SIZE = 3,
        size;

    self.squares = [];

    self.hasFree = function (position) {
        return self.squares[position.x][position.y] === empty;
    };

    self.emptySquares = function () {
        var i, j,
            squares = [];

        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                if (self.hasFree({ x: i, y: j})) {
                    squares.push({ x: i, y: j});
                }
            }
        }
        return squares;
    };

    self.isEmtpy = function () {
        return self.emptySquares().length === 9;
    };

    self.isFull = function () {
        return self.emptySquares().length === 0;
    };

    self.moveUser = function (position) {
        self.squares[position.x][position.y] = USER;
    };

    self.moveCpu = function (position) {
        self.squares[position.x][position.y] = CPU;
    };

    function threeInAColumn(player) {
        var x,
            squares = self.squares;
        for (x = 0; x < size; x++) {
            if (squares[x][0] === player &&
                    squares[x][1] === player &&
                    squares[x][2] === player) {
                return true;
            }
        }
        return false;
    }

    function threeInARow(player) {
        var y;
        for (y = 0; y < size; y++) {
            if (self.squares[0][y] === player &&
                    self.squares[1][y] === player &&
                    self.squares[2][y] === player) {
                return true;
            }
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
                self.squares[0][2] === player)) {
            return true;
        }
        return false;
    }

    function threeInline(player) {
        return threeInAColumn(player) ||
                threeInARow(player) ||
                threeInDiagonal(player);
    }

    self.userWins = function () {
        return threeInline(USER);
    };

    self.cpuWins = function () {
        return threeInline(CPU);
    };

    self.gameIsOver = function () {
        return self.userWins() || self.cpuWins() || self.isFull();
    };


    self.reset = function () {
        var x, y;
        for (x = 0; x < size; x++) {
            for (y = 0; y < size; y++) {
                self.squares[x][y] = empty;
            }
        }
    };

    function defaultSquares() {
        var x, y,
            result = [];
        for (x = 0; x < DEFAULT_SIZE; x++) {
            result[x] = [];
            for (y = 0; y < DEFAULT_SIZE; y++) {
                result[x].push(empty);
            }
        }
        return result;
    }

    if (initSquares) {
        self.squares = ArrayHelper.cloneMatrix(initSquares);
    } else {
        self.squares = defaultSquares();
    }

    size = self.squares.length;
}