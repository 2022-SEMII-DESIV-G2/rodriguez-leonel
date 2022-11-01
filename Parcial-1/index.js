
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
                // text = Algorithm.htmlElements.input.value + " ";
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
                text = Algorithm.methods.printMatrix(pyramid, floor);
                // Algorithm.htmlElements.result.innerHTML = floor
                // Algorithm.htmlElements.result.innerHTML = Algorithm.methods.printMatrix(pyramid);
                // Algorithm.htmlElements.result.innerHTML = Algorithm.methods.printMatrix(pyramid) + "<br>" + Algorithm.methods.allRoutes(pyramid)
                // Algorithm.htmlElements.result.innerHTML = Algorithm.methods.printAllRoutes(Algorithm.methods.allRoutes(pyramid, floor));
                
                allroutes = Algorithm.methods.allRoutes(pyramid, floor)
                // Algorithm.htmlElements.result.innerHTML =  Algorithm.methods.bestRoute(allroutes)
                Algorithm.htmlElements.result.innerHTML = text + Algorithm.methods.printSingleRoute(allroutes, Algorithm.methods.bestRoute(allroutes), "red");
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
            allRoutes(pyramid) {
                maxvalue = pyramid.length - 1;
                backup = this.copyMatrix(pyramid, maxvalue);
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
                for (let y = 0; y < maxvalue; y++) {
                    for (let x = 0; x <= y; x++) {
                        text += pyramid[y][x] + " ";                        
                    }
                    text += "<br>"
                }
                return text;
            }
        }
    }
    Algorithm.init();
})();