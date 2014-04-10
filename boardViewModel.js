/*global ko */

function BoardViewModel() {
    'use strict';
    var self = this,
        empty = '',
        user = 'X',
        cpu = 'O';

    self.squares = [[], [], []];
    self.result = ko.observable('');

    function isFree(positon) {
        return self.squares[positon.x][positon.y]() === empty;
    }

    function followingPosition(currentPostion) {
        if (currentPostion.y === 2 && currentPostion.x === 2) {
            currentPostion.x = 0;
            currentPostion.y = 0;
        } else if (currentPostion.x === 2) {
            currentPostion.x = 0;
            currentPostion.y += 1;
        } else {
            currentPostion.x += 1;
        }

        return currentPostion;
    }

    function nextBest(currentPostion) {
        var middleSquare = {x:1,y:1},
            firstCorner = {x:0,y:0},
            secondCorner = {x:2,y:0};
            
        if (isFree(middleSquare)) {
            return middleSquare;
        }

        if (isFree(firstCorner)) {
            return firstCorner;
        }

        if (isFree(secondCorner)) {
            return secondCorner;
        }

        currentPostion = followingPosition(currentPostion);

        if(isFree(currentPostion)) {
            return currentPostion;
        }

        return nextBest(currentPostion);
    }

    function nextMove(currentPostion) {
        var x, y;
        
        // todo refactor this whole method to smaller ones

        //columns //
        // two top in columns
        for (x = 0; x < 3; x++) {
            if(self.squares[x][0]() === user &&
                self.squares[x][1]() === user &&
                isFree({ x: x, y: 2})) {
                return { x: x, y: 2};
            }
        }

        // two bottom in columns
        for (x = 0; x < 3; x++) {
            if(self.squares[x][1]() === user &&
                self.squares[x][2]() === user &&
                isFree({ x: x, y: 0})) {
                return { x: x, y: 0};
            }
        }


        // rows //
        // two left columns
        for (y = 0; y < 3; y++) {
            if(self.squares[0][y]() === user &&
                    self.squares[1][y]() === user && 
                    isFree({ x: 2, y: y})) {
                    return { x: 2, y: y};
                }
        }

        // two right columns
        for (y = 0; y < 3; y++) {
            if(self.squares[1][y]() === user &&
                    self.squares[2][y]() === user && 
                    isFree({ x: 0, y: y})) {
                    return { x: 0, y: y};
                }
        }

        // diagonals //
        if(self.squares[0][0]() === user &&
            self.squares[1][1]() === user && 
            isFree({ x: 2, y: 2})) {
            return { x: 2, y: 2};
        }
        if(self.squares[1][1]() === user &&
            self.squares[2][2]() === user && 
            isFree({ x: 0, y: 0})) {
            return { x: 0, y: 0};
        }

        if(self.squares[2][0]() === user &&
            self.squares[1][1]() === user && 
            isFree({ x: 0, y: 2})) {
            return { x: 0, y: 2};
        }
        if(self.squares[1][1]() === user &&
            self.squares[0][2]() === user && 
            isFree({ x: 2, y: 0})) {
            return { x: 2, y: 0};
        }

        return nextBest(currentPostion);
    }

    function threeInAColumn(player) {
        var i;
        for (i = 0; i < 3; i++) {
            if (self.squares[i][0]() === player &&
                    self.squares[i][1]() === player &&
                    self.squares[i][2]() === player) {
                return true;
            }
        }
        return false;
    }

    function threeInARow(player) {
        var i;
        for (i = 0; i < 3; i++) {
            if (self.squares[0][i]() === player &&
                    self.squares[1][i]() === player &&
                    self.squares[2][i]() === player) {
                return true;
            }
        }

        return false;
    }

    function threeInDiagonal(player) {
        if ((self.squares[0][0]() === player &&
                self.squares[1][1]() === player &&
                self.squares[2][2]() === player) 
            ||
            (self.squares[2][0]() === player &&
                self.squares[1][1]() === player &&
                self.squares[0][2]() === player)) {
            return true;
        }

        return false;
    }

    function threeInline(player) {
        return threeInAColumn(player) ||
                threeInARow(player) ||
                threeInDiagonal(player);
    }

    function isBoardFull() {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (isFree({x:i, y:j})) {
                    return false;
                }
            }
        }
        return true;
    }

    self.move = function (x, y) {
        var userPosition = {x:x, y:y},
            cpuPosition;
        if (!isFree(userPosition)) {
            return;
        }
       
        self.squares[userPosition.x][userPosition.y](user);

        if (threeInline(user)) {
            self.result('You win!');
            return;
        }

        if (isBoardFull()) {
            self.result('Draw');
            return;
        }

        cpuPosition = nextMove(userPosition);

        self.squares[cpuPosition.x][cpuPosition.y](cpu);

        if (threeInline(cpu)) {
            self.result('You lose!');
        }
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