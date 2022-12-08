(() => {
    const  Algorithm = {
        htmlElements: {
            result: document.getElementById("result"),
            title: document.getElementById("title"),
            headertitle: document.getElementById("headertitle"),
        },
        init: () => {
            Algorithm.methods.startup();
        },
        methods: {
            startup: (e) => {
                Algorithm.methods.showPyramid();
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
                result += "<div class=exp><div class=fila><h3>Ruta #" + data.routeid + "/" + data.iterations + "</h3>" + Algorithm.methods.printSingleRouteNew(route, "red") + "</div><h3>Sumatoria Total: " + data.total + "</h3></div>";

                Algorithm.htmlElements.headertitle.innerHTML = "Pirámide #" + data.id
                Algorithm.htmlElements.title.innerHTML = "Pirámide #" + data.id
                Algorithm.htmlElements.result.innerHTML = result;

            },
            printSingleRouteNew(route, color) {
                text = "";
                for (let x = 0; x < route.length - 1; x++) {
                    text += "<div class=" + color + ">" + route[x] + "</div>";                    
                }
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
