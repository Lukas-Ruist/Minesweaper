
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

// Vart är  bomberna?
function placerabomber(rutnat, antal_bomber) {
  const y_max = rutnat.length;
  const x_max = rutnat[0].length;
  let placerade = 0;

  while (placerade < antal_bomber) {
      let slump_y = Math.floor(Math.random() * y_max);
      let slump_x = Math.floor(Math.random() * x_max);

      // Kontrollera att det inte redan finns en bomb där
      if (!rutnat[slump_y][slump_x][3]) {
          rutnat[slump_y][slump_x][3] = true;
          placerade++;
      }
  }

  return rutnat;
}


