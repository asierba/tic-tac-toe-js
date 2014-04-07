function BoardViewModel() {
  'use strict';
  var self = this;  

  function initialiseSquares() {
    for(var i=0; i < 9; i++)  {
      self.squares.push(ko.observable(''));
    }
  }

  function isLastSquare(postion) {
    return postion === self.squares.length - 1;
  }

  self.squares = [];
  self.select = function (userPostion) {
    self.squares[userPostion]('X');
    
    var cpuPositon = userPostion+1;
    if(isLastSquare(userPostion)) {
      cpuPositon = userPostion-1;
    } 
    self.squares[cpuPositon]('O');
  };

  initialiseSquares();
}