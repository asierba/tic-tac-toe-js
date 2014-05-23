var ArrayHelper = (function () {
    'use strict';

    function cloneMatrix(matrix) {
        var x, y,
            lengthx = matrix.length,
            lengthy = matrix[0].length,
            result = [];
        for (x = 0; x < lengthx; x++) {
            result[x] = [];
            for (y = 0; y < lengthy; y++) {
                result[x][y] = matrix[x][y];
            }
        }
        return result;
    }

    return {
        cloneMatrix : cloneMatrix
    };
}());