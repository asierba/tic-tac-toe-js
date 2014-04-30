/*global ko, Game*/
function BoardViewModel(board) {
    'use strict';
    var self = this,
        notifier = ko.observable(); // used just to get the board refreshed in the UI

    function updateLayout() {
        notifier.valueHasMutated();
    }

    self.squares = ko.computed(function() {
        notifier();
        return board.squares;
    });

    self.move = function (position) {
        var cpuPosition;

        if (!board.hasFree(position) || board.gameIsOver()) {
            return;
        }
       
        board.moveUser(position);
        
        if (!board.gameIsOver()) {
            cpuPosition = Game.getBestPosition(board);
            board.moveCpu(cpuPosition);
        }
        
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

    self.userStarting = ko.observable(true);

    self.refresh = function () {
        var cpuPosition;

        board.reset();

        if (!self.userStarting()) {
            cpuPosition = Game.getBestPosition(board);
            board.moveCpu(cpuPosition);
        }

        updateLayout();
    };
}