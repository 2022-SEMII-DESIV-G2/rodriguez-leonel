const rest = document.getElementById("result")
document.getElementById('botonlimpiar').style.visibility = 'hidden';
function fcalc(){
     txt = document.getElementById("inputtxt").value.toUpperCase();
    if (txt) {
        resp = "";
            let x = 0;
            while (x < txt.length) {
                valor = "";
                cant = 0;
                let z = 0;
                contiene = false;
                while(z < resp.length) {
                    if (txt.charAt(x) == resp.charAt(z)) {
                        contiene = true;
                    }
                    z++;
                }
                let y = 0;
                while((y < txt.length) && !(contiene)) {
                    if ((txt.charAt(x) == txt.charAt(y)) && !(contiene)) {
                        cant++;
                        valor = txt.charAt(x) + " : " + cant + "<br>";
                    }
                    y++;
                }
                resp = resp + valor;
                x++;
            }
            rest.innerHTML = resp;
            document.getElementById('botonlimpiar').style.visibility = 'visible';
   }
   else {
    rest.innerHTML = "No hay una oracion.";
   }
}
function flimp(){
    document.getElementById("inputtxt").value = ''
    rest.innerHTML = ""
    document.getElementById('botonlimpiar').style.visibility = 'hidden';
}