let rutnat = []
let y_max = 9
let x_max = 9
let minor_max
let argakompisar = 0
let bomb = false 
let flagga = false
let opnad = false
let antal_bomber = 0


// skapar rutnät med rutor [x, y, kompisar som är varnade,om den är en bomb, om den är flaggad]
function skaparutnät(x_max, y_max) {
    rutnat = []

    for (let y = 0; y < y_max; y++) {

        let rad = []; 

        for (let x = 0; x < x_max; x++) {
            rad.push([x, y, argakompisar, bomb, flagga, opnad]); 
        }

        rutnat.push(rad);
    }

    return rutnat;
}

function skapabomb(y, x){

        if(rutnat[y][x][3] === false){

        rutnat[y][x][3] = true
        antal_bomber++

    }

}

// ökar antal kompisar runt varje bomb
function kompisvarnare(y_max, x_max) {
    for (let y = 0; y < y_max; y++) {

        for (let x = 0; x < x_max; x++) {

            if (rutnat[y][x][3]) {

                if (y+1 < y_max) {
                    rutnat[y+1][x][2] += 1;
                    if (x-1 >= 0) rutnat[y+1][x-1][2] += 1;
                    if (x+1 < x_max) rutnat[y+1][x+1][2] += 1;
                }

                if (y-1 >= 0) {
                    rutnat[y-1][x][2] += 1;
                    if (x+1 < x_max) rutnat[y-1][x+1][2] += 1;
                    if (x-1 >= 0) rutnat[y-1][x-1][2] += 1;
                }

                if (x-1 >= 0) rutnat[y][x-1][2] += 1;
                if (x+1 < x_max) rutnat[y][x+1][2] += 1;

            }
        }
    }
}


// sätter en flagga på en ruta
function flagning(y, x){
     rutnat[y][x][4] = true
}


function öppning(y, x){

    if(rutnat[y][x][3] === true){
        //gaem over//
    }
     rutnat[y][x][5] = true
}