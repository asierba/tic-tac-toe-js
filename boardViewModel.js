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
        if(allTaken()) {
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

    self.move = function (position) {
        if (!isFree(position)) {
            return;
        }
        self.squares[position](userMark);

        cpuMove(position);
    };

    function initialiseSquares() {
        for (var i=0; i < 9; i++)  {
            self.squares.push(ko.observable(emptyMark));
        }
    }

    initialiseSquares();
}