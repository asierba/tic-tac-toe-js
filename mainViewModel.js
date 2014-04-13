/*global ko, Board */
function MainViewModel() {
    'use strict';
    var self = this,
        USER = 'X',
        CPU = 'O',
        notifier = ko.observable(), // used just to get the board refreshed in the UI
        board = new Board();

    self.result = ko.observable('');

    self.squares = ko.computed(function() {
        notifier();
        return board.squares;
    });

    function getScore(board, player) {
        var i,
            lastScore,
            possibleBoard,
            currentScore,
            possibleMoves,
            opponent = (player === CPU) ? USER : CPU;

        if (board.threeInline(CPU)) {
            return 10;
        } else if (board.threeInline(USER)) {
            return -10;
        } else if (board.isFull()) {
            return 0;
        } else {
            possibleMoves = board.emptySquares();

            for (i = 0; i < possibleMoves.length; i++) {
                possibleBoard = new Board(board.squares);
                possibleBoard.move(possibleMoves[i], opponent);

                currentScore = getScore(possibleBoard, opponent);

                if(player === CPU) {
                    // find minimun
                    if ((lastScore === undefined) || (currentScore < lastScore)) {
                      lastScore = currentScore;
                    }
                } else {
                    // find maximun
                    if ((lastScore === undefined) || (currentScore > lastScore)) {
                        lastScore = currentScore;
                    }
                }
            }

            return lastScore;
        }
    }

    function nextMove() {
        var i,
            possibleBoard,
            possibleMoves = board.emptySquares(),
            lastScore,
            maxScoredPosition,
            currentScore;

        for (i = 0; i < possibleMoves.length; i++) {
            possibleBoard = new Board(board.squares);
            possibleBoard.move(possibleMoves[i], CPU);

            currentScore = getScore(possibleBoard, CPU);

            // find maximun
           if ((lastScore === undefined) || currentScore >= lastScore) {
               lastScore = currentScore;
               maxScoredPosition = possibleMoves[i];
           }
        }

        return maxScoredPosition;
    }

    function updateLayout() {
        notifier.valueHasMutated();
    }

    function gameIsOver() {
      return board.threeInline(USER) || board.threeInline(CPU) || board.isFull();
    }

    self.move = function (position) {
        var cpuPosition;

        if (!board.hasFree(position) || gameIsOver()) {
            return;
        }
       
        board.move(position, USER);
        updateLayout();

        if (board.threeInline(USER)) {
            self.result('You win!');
            return;
        }

        if (board.isFull()) {
            self.result('Draw');
            return;
        }

        cpuPosition = nextMove();

        board.move(cpuPosition, CPU);
        updateLayout();

        if (board.threeInline(CPU)) {
            self.result('You lose!');
        }
    };
}