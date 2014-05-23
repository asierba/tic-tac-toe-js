function inverse(squares) {
    var x, y,
    	length = squares.length,
        result =  [];
    for (x = 0; x < length; x++) {
    	result[x] = [];
        for (y = 0; y < length; y++) {
            result[x][y] = squares[y][x];
        }
    }

    return result;
}