var CHUNK_X = CHUNK_Z = 5;
var completeNoise;

function diamondSquare(noise, size) {
    var half = size / 2;
    if (half < 1)
        return;
    //square steps
    for (var z = half; z < CHUNK_Z; z+=size)
        for (var x = half; x < CHUNK_X; x+=size)
            squareStep(noise, x % CHUNK_X, z % CHUNK_Z, half);
    // diamond steps
    var col = 0;
    for (var x = 0; x < CHUNK_X; x += half) {
        col++;
        //If this is an odd column.
        if (col % 2 == 1)
            for (var z = half; z < CHUNK_Z; z += size)
                diamondStep(noise, x % CHUNK_X, z % CHUNK_Z, half);
        else
            for (var z = 0; z < CHUNK_Z; z += size)
                diamondStep(noise, x % CHUNK_X, z % CHUNK_Z, half);
    }
    diamondSquare(noise, size / 2);
}


function squareStep(noise, x, z, reach)
{
    var count = 0;
    var avg = 0;
    if (x - reach >= 0 && z - reach >= 0) {
        avg += noise[x-reach][z-reach];
        count++;
    }
    if (x - reach >= 0 && z + reach < CHUNK_Z) {
        avg += noise[x-reach][z+reach];
        count++;
    }
    if (x + reach < CHUNK_X && z - reach >= 0) {
        avg += noise[x+reach][z-reach];
        count++;
    }
    if (x + reach < CHUNK_X && z + reach < CHUNK_Z) {
        avg += noise[x+reach][z+reach];
        count++;
    }
    avg += random(reach);
    avg /= count;
    noise[x][z] = Math.round(avg);
}

function diamondStep(noise, x, z, reach) {
    var count = 0;
    var avg = 0;
    if (x - reach >= 0) {
        avg += noise[x-reach][z];
        count++;
    }
    if (x + reach < CHUNK_X) {
        avg += noise[x+reach][z];
        count++;
    }
    if (z - reach >= 0) {
        avg += noise[x][z-reach];
        count++;
    }
    if (z + reach < CHUNK_Z) {
        avg += noise[x][z+reach];
        count++;
    }
    avg += random(reach);
    avg /= count;
    noise[x][z] = Math.floor(avg);
}

function random(range)
{
    return (Math.floor(Math.random() * range) % (range * 2)) - range;
}

function print(matrix) {
    var ret = "\n";
    for (var i = 0; i < matrix.length; i++) {
        ret += "[ ";
        for (var j = 0; j < matrix[i].length; j++) {
            ret += j < matrix[i].length-1 ? matrix[i][j] + ", " : matrix[i][j];
        }
        ret += " ] \n";
    }
    return ret;
}

function presetNoise(a,b,c,d) {
    completeNoise = [];
    for (var i = 0; i < CHUNK_X; i++) {
        completeNoise.push([]);
        for (var j = 0; j < CHUNK_Z; j++) {
            completeNoise[i].push(0);
        }
    }

    completeNoise[0][0] = a;
    completeNoise[0][CHUNK_Z-1] = b;
    completeNoise[CHUNK_X-1][0] = c;
    completeNoise[CHUNK_X-1][CHUNK_Z-1] = d;
}
