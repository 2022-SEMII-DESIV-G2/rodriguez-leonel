const rest = document.getElementById("result")
var base = [];
var bcon = [];
var pisos = 0;
var rutas = [];
var final = "";
var iteraciones;
var txtdesp = "";
var txtrutas = "";
var txtitera = "";
var txtmayor = "";

function printMatrix(matrix, pisos, rutas, mayor, color) {
    let y = 0;
    text = "";
    while (y <= pisos - 1) {
        let z = 0;
        text = text + "<div class=fila>";
        while (z <= y) {
            if (rutas){
                if (matrix[y][z] == rutas[mayor][y]) {
                    text = text + "<div class=" + color + ">" + matrix[y][z] + "</div>";
                }
                else {
                    text = text + "<div class=valor>" + matrix[y][z] + "</div>";
                }
            }
            else if (matrix[y][z]) {
                text = text + "<div class=valor>" + matrix[y][z] + "</div>";
            }
            else {
                text = text + "<div class=nulo>0</div>";
            }
                z++;
        }
        text = text + "</div>";
        y++;
    }   
    return text;
}

function printArray(param, max, color) {
    let y = 0;
    text = ""
        while (y < max) {
            if (color) {                
                text = text + "<div class=" + color + ">" + param[y] + "</div>";
            }
            else {
                text = text + "<div class=valor>" + param[y] + "</div>";
            }
            y++;
        }
        return text;
}

function CALCbutton() {
    txt = document.getElementById("NUMinput").value;
    txt = txt + " ";
    if (txt) {
        base[0] = [];
        bcon[0] = [];
        espacio = 0;
        cant = 0;
        valores = 0;
        num = true;
        piso = 0;
        i = 0;
        let x = 0;
        numero = "";
        while (x < txt.length) {
            char = txt.charAt(x);
            numero = numero + char;
            if (char == " ") {
                    if ((parseInt(numero) > 0) || (parseInt(numero) <= 0)) {
                        cant++;
                    }
                    else {
                        num = false;
                    }
                    base[piso][i] = numero;
                    bcon[piso][i] = numero;
                    numero = "";
                    espacio++;
                    if (espacio > piso) {
                        valores = valores + piso;
                        piso++;
                        base[piso] = [];
                        bcon[piso] = [];
                        espacio = 0;
                        i = 0;
                }
                else {
                    i++;
                }
            }
            x++;
        }
        valores = valores + piso;
        if (!num) {
            final = "<div class=exp><h3>Hay datos no numericos o hay espacios demas. Los datos no se pueden tomar.</h3></div>";
            rest.innerHTML = final;
        }
        else if (valores != cant){
            valores = valores + piso;
            final = "<div class=exp><h3>Hacen faltan mas datos para completar la piramide. Datos adicionales necesarios: </h3><div class=valor>" + ((valores - cant) + 1) + "</div></h3></div>";
            rest.innerHTML = final;
        }
        else {
            pisos = piso;
            iteraciones = Math.pow(2, pisos - 1);
            final = "<h3>Cantidad de pisos: " + pisos + "</h3><h3>Interaciones posibles: " + iteraciones + "</h3><div class=matriz>";
            final = final + printMatrix(bcon, pisos);
            final = final + "</div>";
            txtdesp = final;
            funcCalc();
            funcMayor();
            funcRutas();
            DESPbutton();
        }
    }
    else {
        final = "<div class=exp><h3>No hay datos para tomar.</h3></div>";
        rest.innerHTML = final;
    }
}

function funcCalc() {
    let h = 0;
    let y = 0;
    let z = 0;
    statpiso = 1;
    statposi = 0;
    final = "<div class=cajaexp>";
    while (h < iteraciones) {
        rutas[h] = [];
        rutas[h][0] = base[0][0];
        posi = 0;
        piso = 1
        if (h == 0) {
            while (piso < pisos) {
                rutas[h][piso] = base[piso][0];
                piso++;
            }
            final = final + "<div class=exp><h3>Iteracion #" + (h + 1) + ": </h3></div><div class=exp><h3>Se borra elemento: " + base[pisos - 1][h] + "</h3></div><div class=exp>";
            base[pisos - 1][h] = null;
        }
        if (h == 1) {
            while (piso < pisos) {
                rutas[h][piso] = base[piso][0];
                piso++;
                if (piso == pisos) {
                    rutas[h][piso - 1] = base[piso - 1][1];
                }
            }
            final = final + "</div><div class=exp><h3>Iteracion #" + (h + 1) + ": </h3></div><div class=exp><h3>Se borra elemento: " + base[pisos - 2][h - 1] + "</h3></div><div class=exp>";
            base[pisos - 2][h - 1] = null;                
            i = 0;
        }
        if (h > 1) {
            final = final + "</div><h3>Iteracion #" + (h + 1) + ": </h3>";
            final = final + "<div class=exp><div class=valor>" + rutas[h][0] + "</div>";
            while (piso < pisos) {
                if (base[piso][posi]) {
                    if (i < 2) {
                        rutas[h][piso] = base[piso][posi];
                        piso++;
                        if (piso == pisos) {
                            if (i == 1) {
                                rutas[h][piso - 1] = base[piso - 1][posi + 1];
                            }
                            i = i + 1;
                        }
                        final = final + "<div class=valor>" + rutas[h][piso - 1] + "</div>";
                    }
                    if (i == 2) {
                        if (piso == pisos) {
                            final = final + "</div><div class=exp><h3>Ultima fila y ultimo valor posible de nodo</h3><div class=valor>" + base[piso - 2][posi] + "</div><h3> se elimina</h3><div class=valor>" + base[piso - 2][posi] + "</div></div><div class=exp>";
                            base[piso - 2][posi] = null;
                            i = 0;
                            posi = 0;
                        }
                    }
                }
                else {
                    if (base[piso][posi + 1]) {
                        final = final + "</div><div class=exp><h3>[" + piso + "," + posi + "] no existe, cambiamos a [" + piso + "," + (posi + 1) + "]:</h3><div class=valor>" + base[piso][posi + 1] + "</div></div></div><div class=exp>"
                        posi = posi + 1;
                    }
                    else {
                        base[piso][posi + 1] = bcon[piso][posi + 1];
                        final = final + "</div><div class=exp><h3>[" + piso + "," + posi + "] no existe,  nodo adjacente tampoco existe [" + piso + "," + (posi + 1) + "]. Se borra [" + (piso - 1) + "," + posi + "]:</h3><div class=valor>" + base[piso - 1][posi] + "</div><h3> se restaura: [" + piso + "," + (posi + 1) + "]:</h3><div class=valor>" + base[piso][posi + 1] + "</div></div><div class=exp>";
                        if (posi == statposi) {
                            final = final + "</div><div class=matriz><h3>Restauracion</h3>";
                            y = statposi;
                            while (y < pisos) {
                                z = statpiso;
                                final = final + "<div class=fila>";
                                while (z <= y) {
                                    base[y][z] = bcon[y][z];
                                    final = final + "<div class=valor>" + base[y][z] + "</div>";
                                    z++;
                                }
                                final = final + "</div>";
                                y++;
                            }
                            if ((piso - 1) == statpiso) {
                                statpiso = statpiso + 1;
                                statposi = statposi + 1;
                                final = final + "<div class=exp><h3><u>No hay mas valores posibles</u> con:<h3><div class=valor>" + base[piso - 1][posi] + "</div></div><div class=exp><h3>Al eliminarse</h3><div class=valor>" + base[piso - 1][posi] + "</div><h3>nueva posicion de restauracion de valores: " + statposi + " proximo valor a eliminar:</h3><div class=valor>" + base[statpiso][statposi] + "</div></div>";
                            }
                            final = final + "</div><div class=exp>";
                        }
                        if (piso != statposi) {
                            base[piso - 1][posi] = null;
                        }
                        piso = 1;
                        posi = 0;
                    }
                }
            }
        }

        final = final + "</div><div class=matriz><h3>Interpretacion #" + (h + 1) + " del la matriz.</h3>";
        final = final + printMatrix(base,pisos);
        final = final + "</div><div class=exp>";
        h = h + 1;
    }
    txtitera = final + "</div></div>"; // cajaexp
}

function funcRutas(){
    let h = 0;
    let x = 0
    txtrutas = "<div class=exp><h3>Rutas posibles.</h3></div><div class=matriz";
    while (h < iteraciones) {
        txtrutas = txtrutas + "<div class=exp><h3>Iteracion #" + (h + 1) + ":</h3></div><div class=exp>" + printArray(rutas[h],pisos,"green") + "</div><h3>Representacion</h3></div>" + printMatrix(bcon,pisos,rutas,h,"green");
        h++;
    }
    txtrutas = txtrutas + "</div>";
}

function funcMayor() {
    let y = 0;
        while (y < iteraciones) {
            let z = 0;
            rutas[y][pisos] = 0;
            while (z < pisos) {
                rutas[y][pisos] = parseInt(rutas[y][pisos]) + parseInt(rutas[y][z]);
                z++;
            }
            y++;
        }

        y = 0;
        mayor = 0
        while (y < iteraciones) {
            if (parseInt(rutas[y][pisos]) > parseInt(rutas[mayor][pisos])) {
                mayor = y;
            }
            y++;
        }
        txtmayor = "</div><div clas=exp><h3>Ruta mas pesada:</h3><div><div class=exp>";
        txtmayor = txtmayor + printArray(rutas[mayor],pisos,"red");
        txtmayor = txtmayor + "</div><div class=exp><h3>Sumatoria total: " + rutas[mayor][pisos] + " Iteracion: " + (mayor + 1) + "/" + iteraciones + ". </h3></div><div class=matriz><h3>Ruta mas pesada:</h3>";
        txtmayor = txtmayor + printMatrix(bcon,pisos,rutas,mayor,"red");
}

function DESPbutton() {
    rest.innerHTML = txtdesp;
}

function RUTAbutton() {
    rest.innerHTML = txtrutas;
}

function EXPbutton() {
    rest.innerHTML = txtitera;
}

function MAYORbutton() {
    rest.innerHTML = txtmayor;
}
