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
            total: document.getElementById("total"),
            title: document.getElementById("title"),

        },
        init: () => {
            Algorithm.methods.showPyramid();
        },
        methods: {
            startup: (e) => {
                Algorithm.methods.getValues(Algorithm.htmlElements.input.value + " ")
            },
            async getValues(text) {
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

                const { data } = await axios.post('http://localhost:4567/pyramids', { datos: text, mayor: Algorithm.methods.textRoute(allroutes, id)});
              
                console.log({ data })
                text = "<div class=exp><h3>Ruta mas pesada: " + Algorithm.methods.printMatrixValue(backup, floor, allroutes[id]) + "</h3></div>";
                Algorithm.htmlElements.result.innerHTML = text + "<div class=exp><h3>Ruta #" + id + "/" + iterations  + "</h3><div class = fila>" + Algorithm.methods.printSingleRoute(allroutes, id, "red") + "</div></div><div class=exp><h3> Sumatoria total: " + sum + "</div></h3>";
            },
            async getPyramids(){
                const { data } = await axios.get('http://localhost:4567/pyramids');
                text = " ";
                for (let render = 0; render < data.pyramids.length; render++) {
                    text += "<a href=\"individual.html?q=\"" + data.pyramids[render].id + ">Piramide #" + data.pyramids[render].id + "</a><br>";                    
                }
                console.log(text);
                Algorithm.htmlElements.total.innerHTML = text;
            },
            transformArray(text){
                array = [];
                spaces = 0;
                index = 0;
                number = "";
                for (let x = 0; x < text.length; x++) {
                    character = text.charAt(x);
                    number += character;
                    if (character == " ") {
                        array[index] = number;
                        number = "";
                        index++;
                    }
                }
                return array;
            },
            transformMatrix(text) {
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
                return pyramid;
            },
            async showPyramid() {
                const urlParams = new URLSearchParams(window.location.search);
                const { data } = await axios.get("http://localhost:4567/pyramids/" + urlParams.get("q"));
                pyramid = Algorithm.methods.transformMatrix(data.datos + " ");
                route = Algorithm.methods.transformArray(data.mayor + " ");
                result = Algorithm.methods.printMatrixValue(pyramid , false , route);
                result += "<div class=exp><div class=fila><h3>Ruta #ID/ITERATIONS</h3>" + Algorithm.methods.printSingleRouteNew(route, "red") + "</div><h3>Sumatoria Total:ID</h3></div>";
                
                // "<div class=exp><h3>Ruta #" + id + "/" + iterations  + 
                // "</h3><div class = fila>" + Algorithm.methods.printSingleRoute(allroutes, id, "red") + 
                // "</div></div><div class=exp><h3> Sumatoria total: " + sum + "</div></h3>";

                Algorithm.htmlElements.title.innerHTML = "Piramide #" + data.id
                Algorithm.htmlElements.result.innerHTML = result;
                

                console.log(Algorithm.methods.transformArray(data.mayor + " "))
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
            textRoute(route, id) {
                text = "";
                for (let i = 0; i < route[id].length; i++) {
                    text += route[id][i];
                }
                return text;
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
            printSingleRouteNew(route, color) {
                text = "";
                for (let x = 0; x < route.length - 1; x++) {
                    text += "<div class=" + color + ">" + route[x] + "</div>";                    
                }
                return text;
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
                if (!maxvalue) {
                    maxvalue = matrix.length - 1;
                }
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
