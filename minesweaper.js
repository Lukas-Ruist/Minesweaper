
let rutnat = []
let y_max = 9
let x_max = 9
let minor_max
let z = 0
let bomb = false 
let flagga = false

function skaparutnät(y_max, x_max) {
    for (let x = 1; x <= y_max; x++) {

        for (let y = 1; y <= x_max; y++) {
            rutnat.push([x, y, z, bomb, flagga])
        }

    }
            return rutnat

}



console.log(skaparutnät(y_max,x_max))



function kompisstatu(x,y,){
    
}