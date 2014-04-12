/*global ko, Board */
function MainViewModel() {
    'use strict';
    var self = this,
        user = 'X',
        cpu = 'O',
        notifier = ko.observable(), // used just to get the board refreshed in the UI
        board = new Board();

    self.result = ko.observable('');

    self.squares = ko.computed(function() {
        notifier();
        return board.squares;
    });

    function nextBest() {
        var middleSquare = {x:1,y:1},
            firstCorner = {x:0,y:0},
            secondCorner = {x:2,y:0};

        if (board.hasFree(middleSquare))
            return middleSquare;

        if (board.hasFree(firstCorner))
            return firstCorner;

        if (board.hasFree(secondCorner))
            return secondCorner;

        return board.emptySquares()[0];
    }

    function findWin(player) {
        var i,
            possibleBoard,
            possibleMoves = board.emptySquares();

        for (i = 0; i < possibleMoves.length; i++) {
            possibleBoard = new Board(board.squares);
            possibleBoard.move(possibleMoves[i], player);

            if (possibleBoard.threeInline(player))
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

    function updateLayout() {
        notifier.valueHasMutated();
    }

    self.move = function (position) {
        var cpuPosition;

        if (!board.hasFree(position))
            return;
       
        board.move(position, user);
        updateLayout();

        if (board.threeInline(user)) {
            self.result('You win!');
            return;
        }

        if (board.isFull()) {
            self.result('Draw');
            return;
        }

        cpuPosition = nextMove();

        board.move(cpuPosition, cpu);
        updateLayout();

        if (board.threeInline(cpu))
            self.result('You lose!');
    };
}