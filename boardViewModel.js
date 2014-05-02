/*global ko, CpuLogic*/
function BoardViewModel(game) {
    'use strict';
    var self = this,
        notifier = ko.observable(); // used just to get the board refreshed in the UI

    function updateLayout() {
        notifier.valueHasMutated();
    }

    self.squares = ko.computed(function () {
        notifier();
        return game.getSquares();
    });

    self.move = function (position) {
        game.doMove(position);
        updateLayout();
    };

    self.result =  ko.computed(function () {
        notifier();
        return game.result();
    });

    self.userStarting = ko.observable(true);

    self.restart = function () {
        game.restart(self.userStarting());
        updateLayout();
    };
}