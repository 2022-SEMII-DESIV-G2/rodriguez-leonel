(() => {
    const  Algorithm = {
        htmlElements: {
            buttoncalculate: document.getElementById("calculate"),
            input: document.getElementById("inputtext"),
            buttonrandomize: document.getElementById("calculaterandom"),
            range: document.getElementById("range"),
            final: document.getElementById("final"),
            size: document.getElementById("floors"),
            result: document.getElementById("result"),

        },
        init: () => {
            Algorithm.htmlElements.buttoncalculate.addEventListener("click", Algorithm.methods.startup);
            Algorithm.htmlElements.buttonrandomize.addEventListener("click", Algorithm.methods.generateValues);
        },
        methods: {
            startup: (e) => {
                Algorithm.methods.getValues(Algorithm.htmlElements.input.value + " ")
            },
            getValues(text) {
                pyramid = [];
                floor = 0;
                pyramid[floor] = [];
                spaces = 0;
                index = 0;
                number = "";
                for (let x = 0; x < text.length; x++) {
                    character = text.charAt(x);
                    number += character;
                    if (character == " ") {
                        pyramid[floor][index] = number;
                        number = "";
                        spaces++;
                        if (spaces > floor) {
                            floor++;
                            pyramid[floor] = [];
                            spaces = 0;
                            index = 0;
                        }
                        else {
                            index++;
                        }
                    }
                }
                backup = Algorithm.methods.copyMatrix(pyramid, floor);
                allroutes = Algorithm.methods.allRoutes(pyramid, floor);
                id = Algorithm.methods.bestRoute(allroutes);
                iterations = Math.pow(2, floor - 1);
                sum = Algorithm.methods.sumRoute(allroutes, id);
                text = "<div class=exp><h3>Ruta mas pesada: " + Algorithm.methods.printMatrixValue(backup, floor, allroutes[id]) + "</h3></div>";
                Algorithm.htmlElements.result.innerHTML = text + "<div class=exp><h3>Ruta #" + id + "/" + iterations  + "</h3><div class = fila>" + Algorithm.methods.printSingleRoute(allroutes, id, "red") + "</div></div><div class=exp><h3> Sumatoria total: " + sum + "</div></h3>";
            },
            generateValues() {
                min = parseInt(Algorithm.htmlElements.range.value);
                max = parseInt(Algorithm.htmlElements.final.value);
                size = parseInt(Algorithm.htmlElements.size.value);
                gauss = ((size + 1) / 2)*size;
                numbers = "";
                for (let x = 0; x < gauss; x++) {
                    numbers += (Math.floor(Math.random()*(max - min) ) + min) + " ";
                }
                Algorithm.methods.getValues(numbers);               
            },
            sumRoute (route, id) {
                sum = 0;
                for (let x = 0; x < route[id].length; x++) {
                    sum = sum + parseInt(route[id][x]);                    
                }
                return sum;
            },
            allRoutes(pyramid) {
                maxvalue = pyramid.length - 1;
                backup = Algorithm.methods.copyMatrix(pyramid, maxvalue);
                iterations = Math.pow(2, maxvalue - 1);
                restore_position = 0;
                restore_floor = 1;
                routes = [];
                let h = 0;
                while(h < iterations) {
                    routes[h] = [];
                    position = 0;
                    let floor = 0;
                    while (floor < maxvalue) {
                        if (pyramid[floor][position]) {
                            routes[h][floor] = pyramid[floor][position];
                            floor++;
                            if (floor == maxvalue) {
                                if (h == 0) {
                                    pyramid[floor - 1][position] = null;
                                }
                                if (h == 1) {                                    
                                    pyramid[floor - 2][0] = null;
                                    index = 0;
                                }
                                if (h > 1) {                                   
                                    routes[h][floor - 1] = pyramid[floor - 1][position + index];
                                    index++;
                                    if (index == 2) {
                                        pyramid[floor - 2][position] = null;
                                        index = 0;
                                    }
                                    position = 0;
                                }
                            }
                        }
                        else if (pyramid[floor][position + 1]) {
                            position++;
                        }
                        else {
                            pyramid[floor - 1][position] = null;
                            pyramid[floor][position + 1] = backup[floor][position + 1];
                            pyramid = this.restoreMatrix(pyramid, maxvalue, backup, floor, (position + 1));
                            position = 0;
                            floor = 0;
                        }
                    };
                    h++;
                }
                return routes;
            },
            bestRoute(routes) {
                values = [];
                for (let x = 0; x < routes.length; x++) {
                    values[x] = 0;
                    for (let y = 0; y < routes[x].length; y++) {
                        values[x] = parseInt(values[x]) + parseInt(routes[x][y])                       
                    }
                }
                bestID = 0;
                for (let z = 0; z < values.length; z++) {
                    if (parseInt(values[z]) > parseInt(values[bestID])) {
                        bestID = z
                    }
                }
                return bestID;
            },
            restoreMatrix(matrix, floors, backup, i, j){
                for (let x = i; x < floors; x++) {
                    for (let y = j; y <= x; y++) {
                        matrix[x][y] = backup[x][y];
                    }
                }
                return matrix;
            },
            copyMatrix(matrix, floors) {
                copy = [];
                for (let x = 0; x < floors; x++) {
                    copy[x] = [];
                    for (let y = 0; y <= x; y++) {
                        copy[x][y] = matrix[x][y];
                    }
                }
                return copy;
            },
            printSingleRoute(routes, id, color) {
                text = "";
                for (let x = 0; x < routes[id].length; x++) {
                    text += "<div class=" + color + ">" + routes[id][x] + "</div>";                    
                }
                return text;
            },
            printAllRoutes(routes) {
                text = "";
                for (let y = 0; y < routes.length; y++) {
                    for (let x = 0; x < routes[y].length; x++) {
                        text += routes[y][x] + " ";
                    }
                    text += "<br>"
                }
                return text;
            },
            printMatrix(pyramid, maxvalue) {
                text = "";
                let y = 0;
                text += "<div class=matriz>";
                for (let y = 0; y < maxvalue; y++) {
                    text += "<div class=fila>";
                    for (let x = 0; x <= y; x++) {
                        text += "<div class=grey>" + pyramid[y][x] + "</div>";                        
                    }
                    text += "</div>";
                }
                text += "</div>";
                return text;
            },
            printMatrixValue(matrix, maxvalue, route) {
                let y = 0;
                text = "<div class=matriz>";
                while (y <= maxvalue - 1) {
                    let z = 0;
                    text = text + "<div class=fila>";
                    while (z <= y) {
                        if (route){
                            if (matrix[y][z] == route[y]) {
                                text = text + "<div class=red>" + matrix[y][z] + "</div>";
                            }
                            else {
                                text = text + "<div class=grey>" + matrix[y][z] + "</div>";
                            }
                        }
                        else if (matrix[y][z]) {
                            text = text + "<div class=grey>" + matrix[y][z] + "</div>";
                        }
                        else {
                            text = text + "<div class=black>0</div>";
                        }
                            z++;
                    }
                    text = text + "</div>";
                    y++;
                }  
                text += "</div>";
                return text;
            }
        }
    }
    Algorithm.init();
})();
