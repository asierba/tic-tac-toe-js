/*global ko */
function BoardViewModel() {
    'use strict';
    var self = this,
        empty = '',
        user = 'X',
        cpu = 'O';

    self.squares = [[], [], []];
    self.result = ko.observable('');

    function isFree(position) {
        return self.squares[position.x][position.y]() === empty;
    }

    function emptySquares() {
        var i, j, 
            squares = [];

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (isFree({x:i, y:j}))
                    squares.push({x:i, y:j});
            }
        }

        return squares;
    }

    function nextBest() {
        var middleSquare = {x:1,y:1},
            firstCorner = {x:0,y:0},
            secondCorner = {x:2,y:0};

        if (isFree(middleSquare))
            return middleSquare;

        if (isFree(firstCorner))
            return firstCorner;

        if (isFree(secondCorner))
            return secondCorner;

        return emptySquares()[0];
    }  

    function cloneBoard(squares) {
        var i, j,
            newSquares = [[], [], []];
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                newSquares[i].push(ko.observable(squares[i][j]()));
            }
        }

        return newSquares;
    }

    function findWin(player) {
        var i,
            possibleBoard,
            possibleMoves = emptySquares();

        for (i = 0; i < possibleMoves.length; i++) {
            possibleBoard = cloneBoard(self.squares);
            possibleBoard[possibleMoves[i].x][possibleMoves[i].y](player);

            if (threeInline(player, possibleBoard))
                return possibleMoves[i];
        }
    }

    function nextMove() {
        var winningPosition,
            blockUserPosition;

        if(winningPosition = findWin(cpu))
            return winningPosition;

        if(blockUserPosition = findWin(user))
            return blockUserPosition;

        return nextBest();
    }

    function threeInAColumn(player, squares) {
        var i,
            squares = squares || self.squares;
        for (i = 0; i < 3; i++) {
            if (squares[i][0]() === player &&
                    squares[i][1]() === player &&
                    squares[i][2]() === player)
                return true;
        }
        return false;
    }

    function threeInARow(player, squares) {
        var i,
            squares = squares || self.squares;
        for (i = 0; i < 3; i++) {
            if (squares[0][i]() === player &&
                    squares[1][i]() === player &&
                    squares[2][i]() === player)
                return true;
        }

        return false;
    }

    function threeInDiagonal(player, squares) {
        var squares = squares || self.squares;
        if ((squares[0][0]() === player &&
                squares[1][1]() === player &&
                squares[2][2]() === player) 
            ||
            (squares[2][0]() === player &&
                squares[1][1]() === player &&
                squares[0][2]() === player))
            return true;

        return false;
    }

    function threeInline(player, squares) {
        return threeInAColumn(player, squares) ||
                threeInARow(player, squares) ||
                threeInDiagonal(player, squares);
    }

    function isBoardFull() {
        return emptySquares().length == 0;
    }

    self.move = function (position) {
        var cpuPosition;

        if (!isFree(position))
            return;
       
        self.squares[position.x][position.y](user);

        if (threeInline(user)) {
            self.result('You win!');
            return;
        }

        if (isBoardFull()) {
            self.result('Draw');
            return;
        }

        cpuPosition = nextMove();

        self.squares[cpuPosition.x][cpuPosition.y](cpu);

        if (threeInline(cpu))
            self.result('You lose!');
    };

    function initialiseEmptyBoard() {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                self.squares[i].push(ko.observable(empty));
            }
        }
    }

    initialiseEmptyBoard();
}