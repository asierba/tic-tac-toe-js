function inverse(squares) {
    var x, y,
        result =  [[], [], []];
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {
            result[x][y] = squares[y][x];
        }
    }

    return result;
}