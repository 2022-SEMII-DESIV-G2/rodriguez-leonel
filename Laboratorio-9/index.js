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
        final = final + "String Size: " + txt.length + "<br>";
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
        final = final + "Pisos: " + piso + "  Iteraciones: " + iteraciones + "<br><br>";
        let h = 0;
        let y = 0;
        let z = 0;
        statpiso = 1;
        statposi = 0;
        var rutas = [];
        while(h < iteraciones) {
            rutas[h] = [];
            rutas[h][0] = base[0][0];
            posi = 0;
            piso = 1
            if (h == 0) {
                final = final + "Itera #" + h + ": ";
                final = final + "<br> Piso 0 = " + rutas[h][0] + "<br>";
                while (piso < pisos) {
                    rutas[h][piso] = base[piso][0];
                    final = final + "Piso  " + piso + " = " + rutas[h][piso] + " <br>"
                    piso++;
                }
                final = final + " Se borra elemento: " + base[pisos - 1][h] + "<br>";
                base[pisos - 1][h] = null;
            }
            if (h == 1) {
                final = final + "Itera #" + h + ": ";
                final = final + "<br> Piso 0 = " + rutas[h][0] + "<br>";
                while (piso < pisos) {
                    rutas[h][piso] = base[piso][0];
                    piso++;
                    if (piso == pisos) {
                        rutas[h][piso - 1] = base[piso - 1][1];
                    }
                    final = final + "Piso  " + (piso - 1) + " = " + rutas[h][piso - 1] + " <br>"
                }
                base[pisos - 2][h - 1] = null;
                final = final + " Se borra ningun elemento.<br>";                
                i = 0;
            }
            if (h > 1) {
                final = final + "Itera #" + h + ": <br>";
                final = final + rutas[h][0];
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
                            final = final + rutas[h][piso - 1];
                        }
                        if (i == 2) {
                            if (piso == pisos){
                                final = final + "<br>Ultima fila, i == 2 eliminar " + base[piso - 2][posi] + "[" + (piso - 2) + "," + posi + "]<br>";
                                base[piso - 2][posi] = null;
                                i = 0;
                                posi = 0;
                                }
                        }
                    }
                    else {
                        if (base[piso][posi + 1]) {
                            final = final  + "<br>[" + piso + "," + posi + "] no existe, cambiamos a [" + piso + "," + (posi + 1) + "]: " + base[piso][posi + 1] + "<br>"
                            posi = posi + 1;
                        }
                        else {
                            base[piso][posi + 1] = bcon[piso][posi + 1];
                            final = final  + "<br>[" + piso + "," + posi + "] no existe,  nodo adjacente tampoco existe [" + piso + "," + (posi + 1) + "]. Se borra [" + (piso - 1) + "," + posi + "]: " + base[piso - 1][posi] + ", se restaura: [" + piso + "," + (posi + 1) + "]:" + base[piso][posi + 1] + "<br>";
                            if (posi == statposi) {
                                if (piso == statpiso){
                                    statpiso = statpiso + 1;
                                    statposi = statposi + 1;
                                    final = final + "<br><u>No hay mas valores posibles</u> en posicion: " + posi + " ya que se elimino [" + (piso - 1) + "," + posi + "] nueva posicion de restauracion: " + statposi + " proximo por eliminar: [" + statpiso + "," + statposi + "].<br>";
                                }
                                final = final + "Restauracion <br>";
                                y = statposi - 1;
                                while (y < pisos) {
                                    z = statpiso;
                                    while(z <= y){
                                        base[y][z] = bcon[y][z];
                                        final = final + base[y][z] + " ";
                                        z++;
                                    }
                                    final = final + "<br>";
                                    y++;
                                }
                            }
                            if (piso != statposi) {
                                final = final + "<u>BORRE " + base[piso - 1][posi] + " </u><br>";
                                base[piso - 1][posi] = null;
                            }
                            piso = 1;
                            posi = 0;
                        }
                    }
        }
                                
            }
            final = final + "<br>";
            h = h + 1;
        }
        
        

        final = final + "<br>Matriz base<br>";
        y = 0;
        while (y < pisos) {
            z = 0;
            while (z <= y) {
                if (base[y][z]) {
                    final = final + base[y][z] + " ";
                }
                else {
                    final = final + "* "; 
                }
                z++;
            }
            final = final + "<br> "
            y++;
        }

        final = final + "<br>Matriz bcon<br>";
        y = 0;
        while (y <= pisos) {
            z = 0;
            while (bcon[y][z]) {
                final = final + bcon[y][z] + " ";
                z++;
            }
            final = final + "<br>"
            y++;
        }

        final = final + "<br>Rutas<br>";
        y = 0;
        while (y < iteraciones) {
            z = 0;
            rutas[y][pisos] = 0;
            while (z < pisos) {
                final = final + rutas[y][z] + " ";
                rutas[y][pisos] = parseInt(rutas[y][pisos]) + parseInt(rutas[y][z]);
                z++;
            }
            // final = final + "Suma: " + rutas[y][z] + " ";
            final = final + "<br>"
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

        final = final + "<br>Ruta mas pesada:<br>";

        y = 0;
        while (y < pisos) {
            final = final + rutas[mayor][y] + " ";
            y++;
        }
        final = final + " sumatoria total: " + rutas[mayor][y] + " ID: " + (mayor + 1) + "/" + iteraciones + ". <br>";
        
        final = final + "<br>Ruta mas pesada:<br>";
        y = 0;
        while (y <= pisos) {
            z = 0;
            while (bcon[y][z]) {
                if (bcon[y][z] == rutas[mayor][y]){
                    final = final + "&nbsp<u class=mayor>" + bcon[y][z] + "</u>&nbsp";                    
                }
                else {
                    final = final + "&nbsp" + bcon[y][z] + "&nbsp";
                }
                z++;
            }
            final = final + "<br>"
            y++;
        }
        
        rest.innerHTML = final
    }
}

        