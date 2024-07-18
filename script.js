const image = document.querySelector(".image");

// fecthing values from HTML form
function getValues(){
    let cells = parseInt(document.getElementById("cells", 10).value) + 4;
    console.log(cells);
    let gens = document.getElementById("gens").value;
    let rule_decimal = document.getElementById("rule").value;
    let rule_bin = (rule_decimal >>> 0).toString(2).padStart(8, '0');
    
    let rule_arr = [
        [
            [rule_bin[7], rule_bin[6]],[rule_bin[5], rule_bin[4]]
        ],
        [
            [rule_bin[3], rule_bin[2]],[rule_bin[1], rule_bin[0]]
        ]
    ]

    removeAllChildren(image);
    renderPlot(cells, gens, rule_arr);
}

// Plot generation, just the cells - all white except start cell in the center
function renderPlot(cells, gens, rule_arr){
    for(let j=0; j<gens; j++){
        let newRow = document.createElement('div');
        newRow.className = "row";
        image.appendChild(newRow);
        for(let i=0; i<cells; i++){
            let newPixel = document.createElement('div');
            newPixel.classList.add("cell");
            newPixel.dataset.state = 0;
            newPixel.classList.add("c" + j + "-" + i);
    
            if(j==0 && i == Math.floor(cells/2)){
                newPixel.dataset.state = 1;
            }
    
            newRow.appendChild(newPixel);
        }
    }

    // Array based generation (11.07.2024)
    for(let j=0; j<gens; j++){
        for(let i=0; i<cells; i++){
            if(i>1 && i<cells-2 && j<gens-1){
                current = document.querySelector("." + "c" + j + "-" + i).dataset.state;
                left = document.querySelector("." + "c" + j + "-" + (i-1)).dataset.state;
                right = document.querySelector("." + "c" + j + "-" + (i+1)).dataset.state;
                next = document.querySelector("." + "c" + (j+1) + "-" + i);

                next.dataset.state = rule_arr[left][current][right];
            }
        }
    }

    concentrationGraph(cells, gens);
}

function removeAllChildren(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

let myChart;
const rootStyles = getComputedStyle(document.documentElement);
const fg = rootStyles.getPropertyValue('--alive').trim();

function concentrationGraph(cells, gens) {
    let concs = [];
    let rows = [];
    for (let j = 0; j < gens; j++) {
        let prov_sum = 0;
        for (let i = 0; i < cells; i++) {
            if (document.querySelector(".c" + j + "-" + i).dataset.state == 1) {
                prov_sum += 1;
            }
        }
        concs.push(prov_sum / cells);
    }

    for (let i = 1; i <= gens; i++) {
        rows.push(i);
    }

    const ctx = document.getElementById('cons-chart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: rows,
            datasets: [{
                label: 'Concentration over Generations',
                data: concs,
                borderColor: fg,
                borderWidth: 8,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Generation',
                        font: {
                            size: 50
                        }
                    },
                    ticks: {
                        font: {
                            size: 50
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Concentration',
                        font: {
                            size: 50
                        }
                    },
                    ticks: {
                        font: {
                            size: 50
                        }
                    }
                }
            }
        }
    });
}