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

    function max(currentMove, bestMove) {
      return currentMove.score <= bestMove.score;
    }

    function min(currentMove, bestMove) {
      return currentMove.score >= bestMove.score;
    }

    function getBestMove(newBoard, player, level) {
        var i,
            possibleBoard,
            bestMove,
            currentMove,
            possibleMoves,
            level = level || 0,
            opponent = (player === CPU) ? USER : CPU,
            compare = (player === CPU) ? max : min;

        if (newBoard.threeInline(CPU)) {
            return { score: 100 - level };
        } else if (newBoard.threeInline(USER)) {
            return { score: -100 };
        } else if (newBoard.isFull()) {
            return { score: 0 };
        }

        possibleMoves = newBoard.emptySquares();

        for (i = 0; i < possibleMoves.length; i++) {
            possibleBoard = new Board(newBoard.squares);
            possibleBoard.move(possibleMoves[i], opponent);

            currentMove = getBestMove(possibleBoard, opponent, level + 1);

            if ((bestMove === undefined) || compare(currentMove, bestMove)) {
              bestMove = {
                score: currentMove.score,
                position: possibleMoves[i]
              };
            }
        }

        return bestMove;
    }

    function nextMove() {
      var move = getBestMove(board, USER);
      return move.position;
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