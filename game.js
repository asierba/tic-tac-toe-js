/*global Board, Turn */
Turn = {
    user: 0,
    cpu: 1
};

function Game(mainBoard) {
    'use strict';
    var self = this;

    function isSmaller(current, other) {
        if(other === undefined) {
            return true;
        }
        return current.score < other.score;
    }

    function isGreater(current, other) {
        if(other === undefined) {
            return true;
        }
        return current.score > other.score;
    }

    function getBestMove(board, turn, level) {
        var i,
            possibleBoard,
            bestMove,
            currentMove,
            possibleMoves,
            level = level || 0,
            turn = turn || Turn.user,
            nextTurn = (turn === Turn.user) ? Turn.cpu : Turn.user,
            isBetter = (turn === Turn.user) ? isGreater : isSmaller;

        if (board.cpuWins()) {
            return { score: 100 - level };
        } else if (board.userWins()) {
            return { score: -100 };
        } else if (board.isFull()) {
            return { score: 0 };
        }

        possibleMoves = board.emptySquares();

        for (i = 0; i < possibleMoves.length; i++) {
            possibleBoard = new Board(board.squares);

            if (turn === Turn.user) {
                possibleBoard.moveCpu(possibleMoves[i]);
            } else {
                possibleBoard.moveUser(possibleMoves[i]);
            }

            currentMove = getBestMove(possibleBoard, nextTurn, level + 1);

            if (isBetter(currentMove, bestMove)) {
                bestMove = currentMove;
                bestMove.position = possibleMoves[i];
            }
        }

        return bestMove;
    }

    self.doCpuMove = function() {
        var move,
            position;

        if (mainBoard.gameIsOver()) {
            return;
        }

        move = getBestMove(mainBoard);
        position = move.position;

        mainBoard.moveCpu(position);
    };
}