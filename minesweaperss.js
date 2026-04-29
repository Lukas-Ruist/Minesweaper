let rutnat = []

let y_max = 15
let x_max = 10
let z_max = 5

let currentZ = 0

let argakompisar = 0
let bomb = false 
let flagga = false
let opnad = false
let aktiv_ruta = true
let dald_ruta = false

let antal_bomber = 0
let antal_ratt = 0
let spel = true


// =====================
// SKAPA RUTNÄT (DIN STRUKTUR BEVARAD)
function skaparutnat(x_max, y_max, z_max) {
    rutnat = []

    for (let y = 0; y < y_max; y++) {
        let rad = []; 

        for (let x = 0; x < x_max; x++) {
            let djup = []

            for (let z = 0; z < z_max; z++) {

                djup.push([
                    x, y, z,
                    argakompisar,
                    bomb,
                    flagga,
                    opnad,
                    aktiv_ruta,
                    dald_ruta
                ]); 
            }

            rad.push(djup)
        }

        rutnat.push(rad);
    }
}



// =====================
// BOMBER
function skapabomb(y, x, z){

    if (rutnat[y][x][z][4] === false){
        rutnat[y][x][z][4] = true
        antal_bomber++
    }
}


// =====================
// GRANNAR (oförändrad logik)
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


                    // z+1
                    if (z+1 < z_max) {

                        rutnat[y][x][z+1][3] += 1;

                        if (y+1 < y_max) {
                            rutnat[y+1][x][z+1][3] += 1;
                            if (x-1 >= 0) rutnat[y+1][x-1][z+1][3] += 1;
                            if (x+1 < x_max) rutnat[y+1][x+1][z+1][3] += 1;
                        }

                        if (y-1 >= 0) {
                            rutnat[y-1][x][z+1][3] += 1;
                            if (x-1 >= 0) rutnat[y-1][x-1][z+1][3] += 1;
                            if (x+1 < x_max) rutnat[y-1][x+1][z+1][3] += 1;
                        }

                        if (x-1 >= 0) rutnat[y][x-1][z+1][3] += 1;
                        if (x+1 < x_max) rutnat[y][x+1][z+1][3] += 1;
                    }


                    // z-1
                    if (z-1 >= 0) {

                        rutnat[y][x][z-1][3] += 1;

                        if (y+1 < y_max) {
                            rutnat[y+1][x][z-1][3] += 1;
                            if (x-1 >= 0) rutnat[y+1][x-1][z-1][3] += 1;
                            if (x+1 < x_max) rutnat[y+1][x+1][z-1][3] += 1;
                        }

                        if (y-1 >= 0) {
                            rutnat[y-1][x][z-1][3] += 1;
                            if (x-1 >= 0) rutnat[y-1][x-1][z-1][3] += 1;
                            if (x+1 < x_max) rutnat[y-1][x+1][z-1][3] += 1;
                        }

                        if (x-1 >= 0) rutnat[y][x-1][z-1][3] += 1;
                        if (x+1 < x_max) rutnat[y][x+1][z-1][3] += 1;
                    }

                }
            }
        }
    }
}


// =====================
// FLAGGA
function flagning(y, x, z){

    if (!rutnat[y][x][z][5]) {
        rutnat[y][x][z][5] = true;

        if (rutnat[y][x][z][4]) {
            antal_ratt--
        }

    } else {
        rutnat[y][x][z][5] = false;

        if (rutnat[y][x][z][4]) {
            antal_ratt++
        }
    }
}


// =====================
// ÖPPNING
function öppning(y, x, z){

    if (rutnat[y][x][z][4]) {
        spel = false;
    } else {

        if (rutnat[y][x][z][6]=== false &&
            rutnat[y][x][z][4] === false &&
            rutnat[y][x][z][3] === 0 &&
            rutnat[y][x][z][5] === false) {

            if (y+1 < y_max &&
                rutnat[y+1][x][z][6]=== false &&
                rutnat[y+1][x][z][4] === false &&
                rutnat[y+1][x][z][3] === 0 &&
                rutnat[y+1][x][z][5] === false) {

                öppning(y+1, x, z);

                if (x-1 >= 0 &&
                    rutnat[y+1][x-1][z][6]=== false &&
                    rutnat[y+1][x-1][z][4] === false &&
                    rutnat[y+1][x-1][z][3] === 0 &&
                    rutnat[y+1][x-1][z][5] === false) {
                    öppning(y+1, x-1, z);
                }

                if (x+1 < x_max &&
                    rutnat[y+1][x+1][z][6]=== false &&
                    rutnat[y+1][x+1][z][4] === false &&
                    rutnat[y+1][x+1][z][3] === 0 &&
                    rutnat[y+1][x+1][z][5] === false) {
                    öppning(y+1, x+1, z);
                }
            }

            if (y-1 >= 0 &&
                rutnat[y-1][x][z][6]=== false &&
                rutnat[y-1][x][z][4] === false &&
                rutnat[y-1][x][z][3] === 0 &&
                rutnat[y-1][x][z][5] === false) {

                öppning(y-1, x, z);

                if (x-1 >= 0 &&
                    rutnat[y-1][x-1][z][6]=== false &&
                    rutnat[y-1][x-1][z][4] === false &&
                    rutnat[y-1][x-1][z][3] === 0 &&
                    rutnat[y-1][x-1][z][5] === false) {
                    öppning(y-1, x-1, z);
                }

                if (x+1 < x_max &&
                    rutnat[y-1][x+1][z][6]=== false &&
                    rutnat[y-1][x+1][z][4] === false &&
                    rutnat[y-1][x+1][z][3] === 0 &&
                    rutnat[y-1][x+1][z][5] === false) {
                    öppning(y-1, x+1, z);
                }
            }

            if (x-1 >= 0 &&
                rutnat[y][x-1][z][6]=== false &&
                rutnat[y][x-1][z][4] === false &&
                rutnat[y][x-1][z][3] === 0 &&
                rutnat[y][x-1][z][5] === false) {
                öppning(y, x-1, z);
            }

            if (x+1 < x_max &&
                rutnat[y][x+1][z][6]=== false &&
                rutnat[y][x+1][z][4] === false &&
                rutnat[y][x+1][z][3] === 0 &&
                rutnat[y][x+1][z][5] === false) {
                öppning(y, x+1, z);
            }

            // =====================
            // z+1
            if (z+1 < z_max) {

                if (y+1 < y_max &&
                    rutnat[y+1][x][z+1][6]=== false &&
                    rutnat[y+1][x][z+1][4] === false &&
                    rutnat[y+1][x][z+1][3] === 0 &&
                    rutnat[y+1][x][z+1][5] === false) {

                    öppning(y+1, x, z+1);

                    if (x-1 >= 0 &&
                        rutnat[y+1][x-1][z+1][6]=== false &&
                        rutnat[y+1][x-1][z+1][4] === false &&
                        rutnat[y+1][x-1][z+1][3] === 0 &&
                        rutnat[y+1][x-1][z+1][5] === false) {
                        öppning(y+1, x-1, z+1);
                    }

                    if (x+1 < x_max &&
                        rutnat[y+1][x+1][z+1][6]=== false &&
                        rutnat[y+1][x+1][z+1][4] === false &&
                        rutnat[y+1][x+1][z+1][3] === 0 &&
                        rutnat[y+1][x+1][z+1][5] === false) {
                        öppning(y+1, x+1, z+1);
                    }
                }

                if (y-1 >= 0 &&
                    rutnat[y-1][x][z+1][6]=== false &&
                    rutnat[y-1][x][z+1][4] === false &&
                    rutnat[y-1][x][z+1][3] === 0 &&
                    rutnat[y-1][x][z+1][5] === false) {

                    öppning(y-1, x, z+1);

                    if (x-1 >= 0 &&
                        rutnat[y-1][x-1][z+1][6]=== false &&
                        rutnat[y-1][x-1][z+1][4] === false &&
                        rutnat[y-1][x-1][z+1][3] === 0 &&
                        rutnat[y-1][x-1][z+1][5] === false) {
                        öppning(y-1, x-1, z+1);
                    }

                    if (x+1 < x_max &&
                        rutnat[y-1][x+1][z+1][6]=== false &&
                        rutnat[y-1][x+1][z+1][4] === false &&
                        rutnat[y-1][x+1][z+1][3] === 0 &&
                        rutnat[y-1][x+1][z+1][5] === false) {
                        öppning(y-1, x+1, z+1);
                    }
                }

                if (x-1 >= 0 &&
                    rutnat[y][x-1][z+1][6]=== false &&
                    rutnat[y][x-1][z+1][4] === false &&
                    rutnat[y][x-1][z+1][3] === 0 &&
                    rutnat[y][x-1][z+1][5] === false) {
                    öppning(y, x-1, z+1);
                }

                if (x+1 < x_max &&
                    rutnat[y][x+1][z+1][6]=== false &&
                    rutnat[y][x+1][z+1][4] === false &&
                    rutnat[y][x+1][z+1][3] === 0 &&
                    rutnat[y][x+1][z+1][5] === false) {
                    öppning(y, x+1, z+1);
                }

                if (rutnat[y][x][z+1][6]=== false &&
                    rutnat[y][x][z+1][4] === false &&
                    rutnat[y][x][z+1][3] === 0 &&
                    rutnat[y][x][z+1][5] === false) {
                    öppning(y, x, z+1);
                }
            }

            // =====================
            // z-1
            if (z-1 >= 0) {

                if (y+1 < y_max &&
                    rutnat[y+1][x][z-1][6]=== false &&
                    rutnat[y+1][x][z-1][4] === false &&
                    rutnat[y+1][x][z-1][3] === 0 &&
                    rutnat[y+1][x][z-1][5] === false) {

                    öppning(y+1, x, z-1);

                    if (x-1 >= 0 &&
                        rutnat[y+1][x-1][z-1][6]=== false &&
                        rutnat[y+1][x-1][z-1][4] === false &&
                        rutnat[y+1][x-1][z-1][3] === 0 &&
                        rutnat[y+1][x-1][z-1][5] === false) {
                        öppning(y+1, x-1, z-1);
                    }

                    if (x+1 < x_max &&
                        rutnat[y+1][x+1][z-1][6]=== false &&
                        rutnat[y+1][x+1][z-1][4] === false &&
                        rutnat[y+1][x+1][z-1][3] === 0 &&
                        rutnat[y+1][x+1][z-1][5] === false) {
                        öppning(y+1, x+1, z-1);
                    }
                }

                if (y-1 >= 0 &&
                    rutnat[y-1][x][z-1][6]=== false &&
                    rutnat[y-1][x][z-1][4] === false &&
                    rutnat[y-1][x][z-1][3] === 0 &&
                    rutnat[y-1][x][z-1][5] === false) {

                    öppning(y-1, x, z-1);

                    if (x-1 >= 0 &&
                        rutnat[y-1][x-1][z-1][6]=== false &&
                        rutnat[y-1][x-1][z-1][4] === false &&
                        rutnat[y-1][x-1][z-1][3] === 0 &&
                        rutnat[y-1][x-1][z-1][5] === false) {
                        öppning(y-1, x-1, z-1);
                    }

                    if (x+1 < x_max &&
                        rutnat[y-1][x+1][z-1][6]=== false &&
                        rutnat[y-1][x+1][z-1][4] === false &&
                        rutnat[y-1][x+1][z-1][3] === 0 &&
                        rutnat[y-1][x+1][z-1][5] === false) {
                        öppning(y-1, x+1, z-1);
                    }
                }

                if (x-1 >= 0 &&
                    rutnat[y][x-1][z-1][6]=== false &&
                    rutnat[y][x-1][z-1][4] === false &&
                    rutnat[y][x-1][z-1][3] === 0 &&
                    rutnat[y][x-1][z-1][5] === false) {
                    öppning(y, x-1, z-1);
                }

                if (x+1 < x_max &&
                    rutnat[y][x+1][z-1][6]=== false &&
                    rutnat[y][x+1][z-1][4] === false &&
                    rutnat[y][x+1][z-1][3] === 0 &&
                    rutnat[y][x+1][z-1][5] === false) {
                    öppning(y, x+1, z-1);
                }

                if (rutnat[y][x][z-1][6]=== false &&
                    rutnat[y][x][z-1][4] === false &&
                    rutnat[y][x][z-1][3] === 0 &&
                    rutnat[y][x][z-1][5] === false) {
                    öppning(y, x, z-1);
                }
            }
        }
    }
}

function bombplacerare(antal_bomber, x, y, z){ 
    
    let tx, ty, tz

for (let i = 0; i < antal_bomber; ) {
        
        tx = Math.floor(Math.random()* x_max) 
        ty = Math.floor(Math.random()* y_max) 
        tz = Math.floor(Math.random()* z_max) 
        if(rutnat[ty][tx][tz][4] === false){ 
        rutnat[ty][tx][tz][4] = true 
        i++ 
    } 
  } 
}


// =====================
// UI RENDER
function render() {

    const grid = document.getElementById("grid")
    grid.innerHTML = ""

    for (let y = 0; y < y_max; y++) {
        for (let x = 0; x < x_max; x++) {

            let tile = rutnat[y][x][currentZ]

            let cell = document.createElement("div")
            cell.className = "cell"

            if (tile[6]) {
                cell.classList.add("open")
                cell.innerText = tile[3] === 0 ? "" : tile[3]
            }

            cell.onclick = () => {
                if (!spel) return
                öppning(y, x, currentZ)
                render()
            }

            cell.oncontextmenu = (e) => {
                e.preventDefault()
                flagning(y, x, currentZ)
                render()
            }

            grid.appendChild(cell)
        }
    }
}


// =====================
// Z SYSTEM
function createZPanel() {

    const panel = document.getElementById("zPanel")
    panel.innerHTML = ""

    for (let z = 0; z < z_max; z++) {

        let btn = document.createElement("div")
        btn.className = "zBtn"
        btn.innerText = "Z " + z

        btn.onclick = () => {
            currentZ = z
            render()
            updateZ()
        }

        panel.appendChild(btn)
    }

    updateZ()
}

function updateZ() {
    document.querySelectorAll(".zBtn").forEach((b, i) => {
        b.classList.toggle("active", i === currentZ)
    })
}


// =====================
// START
skaparutnat(x_max, y_max, z_max)

skapabomb(2,3,0)
skapabomb(5,5,1)
skapabomb(7,2,3)

kompisvarnare(y_max, x_max, z_max)

createZPanel()
render()