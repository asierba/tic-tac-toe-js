/*global describe, beforeEach, it, expect, CpuLogic, Board, inverse */
'use strict';

describe('when user makes two in a column', function () {
    var board;
    beforeEach(function () {
        board = new Board(inverse([
                ['X','',''],
                ['X' ,'O' ,''],
                ['' ,'' ,'']]));        
    });

    it('cpu should take next in column to avoid user winning', function () {
        var poisition = CpuLogic.getBestPosition(board);
        expect(poisition).toEqual({ x: 0, y: 2});
    });
});

describe('when user makes two in a row', function () {
     var board;
    beforeEach(function () {
        board = new Board(inverse([
                ['' ,'' ,''],
                ['' ,'X','X'],
                ['O' ,'','']]));
    });

    it('cpu should take next in row to avoid user winning', function () {
        var poisition = CpuLogic.getBestPosition(board);
        expect(poisition).toEqual({ x: 0, y: 1});
    });
});

describe('when user makes two in a diagonal', function () {
    var board;
    beforeEach(function () {
        board = new Board(inverse([
                ['' ,'',''],
                ['','X',''],
                ['X' ,'','O']]));
    });

    it('cpu should take next in diagonal to avoid user winning', function () {
        var poisition = CpuLogic.getBestPosition(board);
        expect(poisition).toEqual({ x: 2, y: 0});
    });
});

describe('when board is empty', function () {
    var board;
    beforeEach(function () {
        board = new Board(inverse([
                ['', '', ''],
                ['', '', ''],
                ['', '', '']]));
    });

    it('cpu should take middle square', function () {
        var poisition = CpuLogic.getBestPosition(board);
        expect(poisition).toEqual({ x: 1, y: 1 });
    });
});

describe('when cpu has chance to make three in diagonal', function () {
    var board;
    beforeEach(function () {
        board = new Board(inverse([
                ['X','','O'],
                ['' ,'','X'],
                ['O','','X']]));
    });

    it('cpu should make three in diagonal', function () {
        var poisition = CpuLogic.getBestPosition(board);
        expect(poisition).toEqual({ x: 1, y: 1});
    });
});

describe('when cpu has chance to make three in a row', function () {
    var board;
    beforeEach(function () {
        board = new Board(inverse([
                ['','O' ,'O'],
                ['','X' ,'X'],
                ['' ,'' ,'X']]));
    });

    it('cpu should make three in a row', function () {
        var poisition = CpuLogic.getBestPosition(board);
        expect(poisition).toEqual({ x: 0, y: 0});
    });
});

describe('when cpu has chance to make three in a column', function () {
    var board;
    beforeEach(function () {
        board = new Board(inverse([
                ['' ,'' ,'O'],
                ['X','X','O'],
                ['X' ,'' ,'']]));
    });

    it('cpu should take make three in a row', function () {
        var poisition = CpuLogic.getBestPosition(board);
        expect(poisition).toEqual({ x: 2, y: 2});
    });
});