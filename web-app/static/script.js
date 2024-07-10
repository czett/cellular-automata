const image = document.querySelector(".image");

// fecthing values from HTML form
function getValues(){
    let cells = document.getElementById("cells").value;
    let gens = document.getElementById("gens").value;
    let rule_decimal = document.getElementById("rule").value;
    let rule_bin = (rule_decimal >>> 0).toString(2).padStart(8, '0');

    removeAllChildren(image);
    renderPlot(cells, gens, rule_bin)
}

// Plot generation, just the cells - all white except start cell in the center
function renderPlot(cells, gens, rule_bin){
    for(let j=0; j<gens; j++){
        let newRow = document.createElement('div');
        newRow.className = "row";
        image.appendChild(newRow);
        for(let i=0; i<cells; i++){
            let newPixel = document.createElement('div');
            newPixel.className = "cell cell-" + j + "-" + i;
    
            if(j==0 && i == Math.floor(cells/2)){
                newPixel.classList.add("alive");
            }
    
            newRow.appendChild(newPixel);
        }
    }
    
    // Procedural row generation
    for(let j=0; j<gens; j++){
        for(let i=0; i<cells; i++){
            if(i>1 && i<cells-2 && j<gens-1){
                let current = document.querySelector(".cell-" + j + "-" + i).classList;
                let right = document.querySelector(".cell-" + j + "-" + (i-1)).classList;
                let left = document.querySelector(".cell-" + j + "-" + (i+1)).classList;
                let next = document.querySelector(".cell-" + (j+1) + "-" + i).classList;
    
                if(left.contains("alive") && current.contains("alive") && right.contains("alive") && rule_bin[0] == 1){
                    next.add("alive");  
                }
                if(left.contains("alive") && current.contains("alive") && !right.contains("alive") && rule_bin[1] == 1){
                    next.add("alive");  
                }
                if(left.contains("alive") && !current.contains("alive") && right.contains("alive") && rule_bin[2] == 1){
                    next.add("alive");  
                }
                if(left.contains("alive") && !current.contains("alive") && !right.contains("alive") && rule_bin[3] == 1){
                    next.add("alive");  
                }
                if(!left.contains("alive") && current.contains("alive") && right.contains("alive") && rule_bin[4] == 1){
                    next.add("alive");  
                }
                if(!left.contains("alive") && !current.contains("alive") && right.contains("alive") && rule_bin[5] == 1){
                    next.add("alive");  
                }
                if(!left.contains("alive") && current.contains("alive") && !right.contains("alive") && rule_bin[6] == 1){
                    next.add("alive");  
                }
                if(!left.contains("alive") && !current.contains("alive") && !right.contains("alive") && rule_bin[7] == 1){
                    next.add("alive");  
                }
            }
        }
    }
}

function removeAllChildren(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}