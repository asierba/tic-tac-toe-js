function BoardViewModel() {
  'use strict';
  var self = this;  

  function initialiseSquares() {
    for(var i=0; i < 9; i++)  {
      self.squares.push(ko.observable(''));
    }
  }

  self.squares = [];
  self.select = function (index) {
    self.squares[index]("X");
  };

  initialiseSquares();
}