let rutnat = []
let y_max = 9
let x_max = 9
let z_max = 1
let minor_max
let argakompisar = 0
let bomb = false 
let flagga = false
let opnad = false
let antal_bomber = 0
let aktiv_ruta = true
let dald_ruta = false
let spel = true


// skapar rutnät [x, y, z, kompisar, bomb, flagga, öppnad, aktiv]
function skaparutnat(x_max, y_max, z_max) {
    rutnat = []

    for (let y = 0; y < y_max; y++) {

        let rad = []; 

        for (let x = 0; x < x_max; x++) {

            let djup = []

            for (let z = 0; z < z_max; z++) {
                djup.push([x, y, z, argakompisar, bomb, flagga, opnad, aktiv_ruta, dald_ruta]); 
            }

            rad.push(djup)
        }

        rutnat.push(rad);
    }

    return rutnat;
}


// lägger bomb
function skapabomb(y, x, z){

    if (rutnat[y][x][z][4] === false){

        rutnat[y][x][z][4] = true
        antal_bomber++

    }

}

// ökar antal kompisar runt varje bomb
function kompisvarnare(y_max, x_max, z_max) {
    for (let y = 0; y < y_max; y++) {

        for (let x = 0; x < x_max; x++) {

            for (let z = 0; z < z_max; z++) {

                if (rutnat[y][x][z][4]) {

                    if (y+1 < y_max) {
                        rutnat[y+1][x][z][3] += 1;
                        if (x-1 >= 0) rutnat[y+1][x-1][z][3] += 1;
                        if (x+1 < x_max) rutnat[y+1][x+1][z][3] += 1;
                    }

                    if (y-1 >= 0) {
                        rutnat[y-1][x][z][3] += 1;
                        if (x+1 < x_max) rutnat[y-1][x+1][z][3] += 1;
                        if (x-1 >= 0) rutnat[y-1][x-1][z][3] += 1;
                    }

                    if (x-1 >= 0) rutnat[y][x-1][z][3] += 1;
                    if (x+1 < x_max) rutnat[y][x+1][z][3] += 1;

                }
            }
        }
    }
}

// flagga ruta
function flagning(y, x, z){
     rutnat[y][x][z][5] = true
}


// öppna ruta
function öppning(y, x, z){

    if (rutnat[y][x][z][4] === true){
        spel = false
    }

    rutnat[y][x][z][6] = true
}


skaparutnat(9,9,1)

skapabomb(2,3,0)
kompisvarnare(y_max, x_max, z_max)

console.log(rutnat[2][3][0]) // bomb
console.log(rutnat[2][2][0]) // granne