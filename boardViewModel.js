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

    function next(index, offset) {
        var offset = offset || 1;
        return (index + offset) % 3;
    }

    function stopUserFromWining() {
        var x, y, moveTo;

        //columns //       
        for (x = 0; x < 3; x++) {     
            for (y = 0; y < 3; y++) {
                moveTo = { x: x, y: next(y, 2)};
                if(self.squares[x][y]() === user &&
                    self.squares[x][next(y)]() === user &&
                    isFree(moveTo))
                    return moveTo;
            }
        }

        // rows //
        for (y = 0; y < 3; y++) {
            for (x = 0; x < 3; x++) {
                moveTo = { x: next(x, 2), y: y};
                if(self.squares[x][y]() === user &&
                    self.squares[next(x)][y]() === user && 
                    isFree(moveTo))
                    return moveTo;
            }
        }

        // diagonals //
        for (x = 0; x < 3; x++) {
            moveTo = { x: next(x, 2), y: next(x, 2)};
            if(self.squares[x][x]() === user &&                
                self.squares[next(x)][next(x)]() === user && 
                isFree(moveTo))
                return moveTo;
        }       
        for (x = 0; x < 3; x++) {
            if(self.squares[2][x]() === user &&
                self.squares[1][next(x)]() === user && 
                isFree({ x: 0, y: next(x, 2)}))
                return { x: 0, y: next(x, 2)};
        }
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

    function findWinForCpu() {
        var i,
            possibleBoard,
            possibleMoves = emptySquares();

        for (i = 0; i < possibleMoves.length; i++) {
            possibleBoard = cloneBoard(self.squares);
            possibleBoard[possibleMoves[i].x][possibleMoves[i].y](cpu);

            if (threeInline(cpu, possibleBoard))
                return possibleMoves[i];
        }
    }

    function nextMove() {
        var winningPosition,
            notLosingPosition;

        if(winningPosition = findWinForCpu())
            return winningPosition;

        if(notLosingPosition = stopUserFromWining())
            return stopUserFromWining();

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