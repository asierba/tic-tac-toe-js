describe('when loading the board', function() {
  var board = new BoardViewModel();

  it('all squares are free', function() {
    for (var i = 0; i < board.squares.length ; i++) {
      expect(board.squares[i]()).toBe('');
    };
  });

  describe('when user clicks in a square', function() {
    it('should be marked with an X', function() {
      board.select(3);

      expect(board.squares[3]()).toBe('X');
    });
  });  
});

