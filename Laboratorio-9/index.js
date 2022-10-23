const rest = document.getElementById("result")
function NUMbutton(){
    txt = document.getElementById("NUMinput").value;
    txt = txt + " ";
    if (txt){
        final = "";
        var base = [];
        var bcon = [];
        base[0] = [];
        bcon[0] = [];
        espacio = 0;
        piso = 0;
        i = 0
        let x = 0;
        numero = "";
        final = final + "<h3>String Size: " + txt.length + "</h3>";
        while (x < txt.length) {
            char = txt.charAt(x);
            numero = numero + char;
            if (char == " ") {
                base[piso][i] = numero;
                bcon[piso][i] = numero;
                numero = "";
                espacio++;
                if (espacio > piso) {
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
        pisos = piso;
        iteraciones = Math.pow( 2 , pisos - 1);
        final = final + "<h3>Pisos: " + piso + "  Iteraciones: " + iteraciones + "</h3>";
        let h = 0;
        let y = 0;
        let z = 0;
        statpiso = 1;
        statposi = 0;
        var rutas = [];
        final = final + "<div class=cajaexp>";
        while(h < iteraciones) {
            rutas[h] = [];
            rutas[h][0] = base[0][0];
            posi = 0;
            piso = 1
            if (h == 0) {
                // final = final + "<br> Piso 0 = " + rutas[h][0] + "<br>";
                while (piso < pisos) {
                    rutas[h][piso] = base[piso][0];
                    // final = final + "Piso  " + piso + " = " + rutas[h][piso] + " <br>"
                    piso++;
                }
                // final = final + "<div class=exp><h3>Se borra elemento: " + base[pisos - 1][h] + "</h3></div>";
                final = final + "<div class=exp><h3>Iteracion #" + (h + 1) + ": </h3></div><div class=exp><h3>Se borra elemento: " + base[pisos - 1][h] + "</h3></div><div class=exp>";
                base[pisos - 1][h] = null;
            }
            if (h == 1) {
                // final = final + "<h3>Iteracion #" + (h + 1) + ": </h3>";
                // final = final + "<br> Piso 0 = " + rutas[h][0] + "<br>";
                while (piso < pisos) {
                    rutas[h][piso] = base[piso][0];
                    piso++;
                    if (piso == pisos) {
                        rutas[h][piso - 1] = base[piso - 1][1];
                    }
                    // final = final + "Piso  " + (piso - 1) + " = " + rutas[h][piso - 1] + " <br>"
                }
                final = final + "</div><div class=exp><h3>Iteracion #" + (h + 1) + ": </h3></div><div class=exp><h3>Se borra elemento: " + base[pisos - 2][h - 1] + "</h3></div><div class=exp>";
                base[pisos - 2][h - 1] = null;
                // final = final + "<h3>Se borra ningun elemento.</h3><div class=exp>";                
                i = 0;
            }
            if (h > 1) {
                final = final + "</div><h3>Iteracion #" + (h + 1) + ": </h3>";
                final = final + "<div class=exp><div class=valor>" + rutas[h][0] + "</div>";
                while (piso < pisos){
                    if (base[piso][posi]){
                        if (i < 2){
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
                            if (piso == pisos){
                                final = final + "</div><div class=exp><h3>Ultima fila, i == 2 eliminar " + base[piso - 2][posi] + "[" + (piso - 2) + "," + posi + "].</h3></div><div class=exp>";
                                base[piso - 2][posi] = null;
                                i = 0;
                                posi = 0;
                                }
                        }
                    }
                    else {
                        if (base[piso][posi + 1]) {
                            final = final  + "</div><div class=exp><h3>[" + piso + "," + posi + "] no existe, cambiamos a [" + piso + "," + (posi + 1) + "]:</h3><div class=valor>" + base[piso][posi + 1] + "</div></div></div><div class=exp>"
                            posi = posi + 1;
                        }
                        else {
                            base[piso][posi + 1] = bcon[piso][posi + 1];
                            final = final  + "</div><div class=exp><h3>[" + piso + "," + posi + "] no existe,  nodo adjacente tampoco existe [" + piso + "," + (posi + 1) + "]. Se borra [" + (piso - 1) + "," + posi + "]:</h3><div class=valor>" + base[piso - 1][posi] + "</div><h3> se restaura: [" + piso + "," + (posi + 1) + "]:</h3><div class=valor>" + base[piso][posi + 1] + "</div></div><div class=exp>";
                            if (posi == statposi) {
                                if (piso == statpiso){
                                    statpiso = statpiso + 1;
                                    statposi = statposi + 1;
                                    final = final + "<h3><u>No hay mas valores posibles</u> en posicion: " + posi + " ya que se elimino [" + (piso - 1) + "," + posi + "] nueva posicion de restauracion: " + statposi + " proximo por eliminar: [" + statpiso + "," + statposi + "].</h3>";
                                }
                                final = final + "</div><div class=matriz><h3>Restauracion</h3>";
                                y = statposi - 1;
                                while (y < pisos) {
                                    z = statpiso;
                                    final = final + "<div class=fila>";
                                    while(z <= y){
                                        base[y][z] = bcon[y][z];
                                        final = final + "<div class=valor>" + base[y][z] + "</div>";
                                        z++;
                                    }
                                    final = final + "</div>";
                                    y++;
                                }
                                final = final + "</div><div class=exp>";
                            }
                            if (piso != statposi) {
                                // final = final + "</div><div class=exp>BORRO:<div class=valor>" + base[piso - 1][posi] + "</div></div><div class=exp>";
                                base[piso - 1][posi] = null;
                            }
                            piso = 1;
                            posi = 0;
                        }
                    }
                }
                // final = final + "</div>";
                
            }

            final = final + "</div><div class=matriz><h3>Interpretacion #" + (h + 1) + " del la matriz.</h3>";
            y = 0;
            while (y < pisos) {
                z = 0;
                final = final + "<div class=fila>";
                while (z <= y) {
                    if (base[y][z]) {
                        final = final + "<div class=valor>" + base[y][z] + "</div>";
                    }
                    else {
                        final = final + "<div class=nulo>0</div>"; 
                    }
                    z++;
                }
                final = final + "</div> "
                y++;
            }       
            final = final + "</div><div class=exp>";
            h = h + 1;
        }
        
        final = final + "</div></div>"; // cajaexp
        
        

        // final = final + "<br>Matriz base<br>";
        // y = 0;
        // while (y < pisos) {
        //     z = 0;
        //     while (z <= y) {
        //         if (base[y][z]) {
        //             final = final + base[y][z] + " ";
        //         }
        //         else {
        //             final = final + "* "; 
        //         }
        //         z++;
        //     }
        //     final = final + "<br> "
        //     y++;
        // }

        // final = final + "<br>Matriz bcon<br>";
        // y = 0;
        // while (y <= pisos) {
        //     z = 0;
        //     while (bcon[y][z]) {
        //         final = final + bcon[y][z] + " ";
        //         z++;
        //     }
        //     final = final + "<br>"
        //     y++;
        // }

        // final = final + "<div class=cajaexp><div class=exp><h3>Rutas</h3><div class=exp>";   
        y = 0;
        while (y < iteraciones) {
            z = 0;
            rutas[y][pisos] = 0;
            while (z < pisos) {
                // final = final + rutas[y][z] + " ";
                rutas[y][pisos] = parseInt(rutas[y][pisos]) + parseInt(rutas[y][z]);
                z++;
            }
            // final = final + "Suma: " + rutas[y][z] + " ";
            // final = final + "<br>"
            y++;
        }

        y = 0;
        mayor = 0
        while (y < iteraciones) {
            if (parseInt(rutas[y][pisos]) > parseInt(rutas[mayor][pisos])){
                mayor = y;
            }
            y++;
        }

        final = final + "</div><div clas=exp><h3>Ruta mas pesada:</h3><div><div class=exp>";

        y = 0;
        while (y < pisos) {
            final = final + "<div class=valor>" + rutas[mayor][y] + "</div>";
            y++;
        }
        final = final + "</div><div class=exp><h3>Sumatoria total: " + rutas[mayor][y] + " ID: " + (mayor + 1) + "/" + iteraciones + ". </h3></div><div class=matriz><h3>Ruta mas pesada:</h3>";
        y = 0;
        while (y <= pisos) {
            z = 0;
            final = final + "<div class=fila>";
            while (bcon[y][z]) {
                if (bcon[y][z] == rutas[mayor][y]){
                    final = final + "<div class=mayor>" + bcon[y][z] + "</div>";                    
                }
                else {
                    final = final + "<div class=valor>" + bcon[y][z] + "</div>";
                }
                z++;
            }
            final = final + "</div>"
            y++;
        }
        final = final + "</div></div>"; //matriz y cajaexp
        
        rest.innerHTML = final
    }
}

        