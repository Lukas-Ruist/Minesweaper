
let rutnat = []
let y_max = 9
let x_max = 9
let minor_max
let z = 0
let bomb = false 

function skaparutnät(y_max, x_max) {
    for (let x = 1; x <= y_max; x++) {

        let rad = []

        for (let y = 1; y <= x_max; y++) {
            rad.push([x, y, z, bomb])
        }

        rutnat.push(rad)
    }
            return rutnat

}



console.log(skaparutnät(y_max,x_max))