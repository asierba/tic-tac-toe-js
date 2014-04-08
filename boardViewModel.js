function BoardViewModel() {
    'use strict';
    var self = this,
        emptyMark = '',
        userMark = 'X',
        cpuMark = 'O';
    
    self.squares = [];
    self.result = ko.observable('');

    function isFree(position) {
        return self.squares[position]() === emptyMark;
    }    

    function nextAvailableSquare(currentPostion) {
        if (!isFree(currentPostion)) {
            currentPostion += 1;
            return nextAvailableSquare(currentPostion);
        }
        return currentPostion;
    }

    function isLastSquare(position) {
        return position === self.squares.length - 1;
    }

    function allTaken() {
        for (var i=0; i < 9; i++)  {
            if(isFree(i)) {
                return false;               
            }
        } 
        return true;
    }

    function cpuMove(userPostion) {
        if (allTaken()) {
            self.result('Draw');
            return;
        }
        var cpuPositon = userPostion + 1;
        if (isLastSquare(userPostion)) {
            cpuPositon = 0;
        }
        cpuPositon = nextAvailableSquare(cpuPositon);

        self.squares[cpuPositon](cpuMark);
    }

    function userWins() {
        var squares = [
            [self.squares[0],self.squares[1],self.squares[2]],
            [self.squares[3],self.squares[4],self.squares[5]],
            [self.squares[6],self.squares[7],self.squares[8]]
        ];

        //columns
        for (var i=0; i < 3; i++)
            if (squares[i][0]() === userMark &&
                squares[i][1]() === userMark &&
                squares[i][2]() === userMark)
                return true;
        //rows
        for (var j=0; j < 3; j++)
            if (squares[0][j]() === userMark &&
                squares[1][j]() === userMark &&
                squares[2][j]() === userMark)
                return true;
        //diagonals
        if (squares[0][0]() === userMark &&
                squares[1][1]() === userMark &&
                squares[2][2]() === userMark)
                return true;    

        if (squares[2][0]() === userMark &&
                squares[1][1]() === userMark &&
                squares[0][2]() === userMark)
                return true;
        

        return false;
    }

    self.move = function (position) {
        if (!isFree(position)) {
            return;
        }
        self.squares[position](userMark);

        if(userWins()) {
            self.result('You win!');
            return;
        }

        cpuMove(position);
    };

    function initialiseSquares() {
        for (var i=0; i < 9; i++)  {
            self.squares.push(ko.observable(emptyMark));
        }
    }

    initialiseSquares();
}