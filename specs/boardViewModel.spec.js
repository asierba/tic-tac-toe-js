describe('when loading the board', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
    });  

    it('all squares are free', function() {
        for (var i = 0; i < board.squares.length ; i++) {
          expect(board.squares[i]()).toBe('');
        };
    });
    

    describe('and user clicks in a square', function() {
        beforeEach(function() { 
            board.move(3);
        });  

        it('should be marked with an X', function() {
            expect(board.squares[3]()).toBe('X');
        });

        it('following square should be marked with an O', function() {
            expect(board.squares[4]()).toBe('O');
        });

        it('game is not ended yet', function() {
            expect(board.result()).toBe('');
        });
    }); 

    describe('and user clicks in the last square of the board', function() {
        var indexLast = 8;
        beforeEach(function() { 
            board.move(indexLast);
        });  

        it('should be marked with an X', function() {
            expect(board.squares[indexLast]()).toBe('X');
        });

        it('first square should be marked with an O', function() {
            expect(board.squares[0]()).toBe('O');
        });
    }); 
});

describe('when user clicks in taken square', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
        board.squares[4]('O');
        board.squares[5]('X');
     
        board.move(4);
    });  

    it('should not take that square', function() {
        expect(board.squares[4]()).not.toBe('X');
    });
    
    it('cpu should not make a move', function() {
        expect(board.squares[5]()).not.toBe('O');
    });
});

describe('when user clicks in square next to taken square', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
        board.squares[4]('X');
        board.squares[8]('O');
     
        board.move(3);
    });  

    it('should take that square', function() {
        expect(board.squares[3]()).toBe('X');
    });
    
    it('cpu should not take already taken square', function() {
        expect(board.squares[4]()).not.toBe('O');
    });

    it('cpu should take the next available', function() {
        expect(board.squares[5]()).toBe('O');
    });
});

describe('when user clicks in square next to two taken squares', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
        board.squares[4]('X');
        board.squares[5]('O');
     
        board.move(3);
    });  

    it('should take that square', function() {
        expect(board.squares[3]()).toBe('X');
    });
    
    it('cpu should not take already taken square', function() {
        expect(board.squares[4]()).not.toBe('O');
    });

    it('cpu should take the next available', function() {
        expect(board.squares[6]()).toBe('O');
    });
});

describe('when user clicks in square next to four taken squares', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
        board.squares[4]('X');
        board.squares[5]('O');
        board.squares[6]('X');
        board.squares[7]('O');
     
        board.move(3);
    });  

    it('should take that square', function() {
        expect(board.squares[3]()).toBe('X');
    });
    
    it('cpu should not take already taken square', function() {
        expect(board.squares[4]()).not.toBe('O');
    });

    it('cpu should take the next available', function() {
        expect(board.squares[8]()).toBe('O');
    });
});

describe('when no more free spaces to be taken by cpu', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
        board.squares[0]('X');
        board.squares[1]('O');
        board.squares[2]('X');
        board.squares[3]('X');
        board.squares[4]('O');
        board.squares[5]('X');        
        board.squares[6]('O');        
        board.squares[8]('O');
     
        board.move(7);
    });  

    it('game should end with draw', function() {
        expect(board.result()).toBe('Draw');
    });
});

describe('when user makes three in a row', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
        board.squares[1]('X');
        board.squares[2]('O');
        board.squares[4]('X');
        board.squares[5]('O');
     
        board.move(7);
    });

    it('user should win', function() {
        expect(board.result()).toBe('You win!');
    });

    it('cpu should not make move', function() {
        expect(board.squares[8]()).not.toBe('O');
    });
});

describe('when user makes three in a row', function() {
    var board;
    
    beforeEach(function() { 
        board = new BoardViewModel();
        board.squares[0]('X');
        board.squares[1]('O');
        board.squares[3]('X');
        board.squares[4]('O');
     
        board.move(6);
    });

    it('user should win', function() {
        expect(board.result()).toBe('You win!');
    });

    it('cpu should not make move', function() {
        expect(board.squares[7]()).not.toBe('O');
    });
});

//when cpu makes 3