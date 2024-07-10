const image = document.querySelector(".image");
let cells = 35;
let gens = 40;
let rule_decimal = 90;
let rule_bin = (rule_decimal >>> 0).toString(2).padStart(8, '0');

// Plot generation, just the cells - all white except start cell in the center
for(let j=0; j<gens; j++){
    let newRow = document.createElement('div');
    newRow.className = "row";
    image.appendChild(newRow);
    for(let i=0; i<cells; i++){
        let newPixel = document.createElement('div');
        newPixel.className = "cell";

        if(j==0 && i == Math.floor(cells/2)){
            newPixel.classList.add("alive");
        }

        newPixel.style.width = "10px";
        newPixel.style.height = "10px";
        newRow.appendChild(newPixel);
    }
}

// Procedural row generation
for(let j=0; j<gens; j++){
    for(let i=0; i<cells; i++){
        
    }
}