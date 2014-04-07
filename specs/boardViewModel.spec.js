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

  describe('when user clicks in a square', function() {
    beforeEach(function() { 
      board.select(3);
    });  

    it('should be marked with an X', function() {
      expect(board.squares[3]()).toBe('X');
    });

    it('following square should be marked with an O', function() {
      expect(board.squares[4]()).toBe('O');
    });
  }); 

   describe('when user clicks in the last square of the board', function() {
    var indexLast = 8;
    beforeEach(function() { 
      board.select(indexLast);
    });  

    it('should be marked with an X', function() {
      expect(board.squares[indexLast]()).toBe('X');
    });

    it('previous square should be marked with an O', function() {
      expect(board.squares[indexLast-1]()).toBe('O');
    });
  }); 
});

