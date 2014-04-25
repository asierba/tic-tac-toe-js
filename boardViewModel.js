/*global ko, Board */
function BoardViewModel() {
    'use strict';
    var self = this,
        notifier = ko.observable(), // used just to get the board refreshed in the UI
        board = new Board(),
        game = new Game(board); // TODO this injection is smelly

    function updateLayout() {
        notifier.valueHasMutated();
    }

    self.squares = ko.computed(function() {
        notifier();
        return board.squares;
    });

    self.move = function (position) {
        if (!board.hasFree(position) || board.gameIsOver()) {
            return;
        }
       
        board.moveUser(position);
        game.doCpuMove();
        updateLayout();
    };

    self.result =  ko.computed(function() {
        notifier();
        if (board.userWins()) {
            return 'You win!';
        }

        if (board.isFull()) {
            return 'Draw';
        }

        if (board.cpuWins()) {
            return 'You lose!';
        }

        return '';
    });
}