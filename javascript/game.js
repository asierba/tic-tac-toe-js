function Game(board) {
	'use strict';
	var self = this;

	self.getSquares = function () {
		return board.squares;
	};

    function isOver() {
        return board.userWins() || board.cpuWins() || board.isFull();
    }

	self.doMove = function (position) {
		var cpuPosition;

		if (!board.hasFree(position) || isOver()) {
            return;
        }

		board.moveUser(position);

        if (!isOver()) {
            cpuPosition = CpuLogic.getBestPosition(board);
            board.moveCpu(cpuPosition);
        }
	};

	self.restart = function (userStarting) {
		var cpuPosition;

        board.reset();

        if (!userStarting) {
            cpuPosition = CpuLogic.getBestPosition(board);
            board.moveCpu(cpuPosition);
        }
	};

	self.result =  function () {
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
    };
}