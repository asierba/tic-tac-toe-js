/*global ko */
function BoardViewModel() {
    'use strict';
    var self = this,
        emptyMark = '',
        userMark = 'X',
        cpuMark = 'O';

    self.squares = [[], [], []];
    self.result = ko.observable('');

    function isFree(x, y) {
        return self.squares[x][y]() === emptyMark;
    }

    function nextAvailableSquare(currentPostion) {
        if (currentPostion.y === 2 && currentPostion.x === 2) {
            currentPostion.x = 0;
            currentPostion.y = 0;
        } else if (currentPostion.x === 2) {
            currentPostion.x = 0;
            currentPostion.y += 1;
        } else {
            currentPostion.x += 1;
        }

        if (isFree(currentPostion.x, currentPostion.y)) {
            return currentPostion;
        }

        return nextAvailableSquare(currentPostion);
    }

    function allTaken() {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (isFree(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }

    function wins(mark) {
        var i, j;
        //columns
        for (i = 0; i < 3; i++) {
            if (self.squares[i][0]() === mark &&
                    self.squares[i][1]() === mark &&
                    self.squares[i][2]() === mark) {
                return true;
            }
        }

        //rows
        for (j = 0; j < 3; j++) {
            if (self.squares[0][j]() === mark &&
                    self.squares[1][j]() === mark &&
                    self.squares[2][j]() === mark) {
                return true;
            }
        }

        //diagonals
        if (self.squares[0][0]() === mark &&
                self.squares[1][1]() === mark &&
                self.squares[2][2]() === mark) {
            return true;
        }

        if (self.squares[2][0]() === mark &&
                self.squares[1][1]() === mark &&
                self.squares[0][2]() === mark) {
            return true;
        }

        return false;
    }

    function cpuWins() {
        return wins(cpuMark);
    }

    function cpuMove(x, y) {
        var cpuPositon = { x: x, y: y };

        if (allTaken()) {
            self.result('Draw');
            return;
        }

        cpuPositon = nextAvailableSquare(cpuPositon);

        self.squares[cpuPositon.x][cpuPositon.y](cpuMark);

        if (cpuWins()) {
            self.result('You lose!');
        }
    }

    function userWins() {
        return wins(userMark);
    }

    self.move = function (x, y) {
        if (!isFree(x, y)) {
            return;
        }
        self.squares[x][y](userMark);

        if (userWins()) {
            self.result('You win!');
            return;
        }

        cpuMove(x, y);
    };

    function initialiseBoard() {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                self.squares[i].push(ko.observable(emptyMark));
            }
        }
    }

    initialiseBoard();
}