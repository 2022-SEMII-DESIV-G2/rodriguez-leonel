const rest = document.getElementById("result")
function NUMbutton(){
    txt = document.getElementById("NUMinput").value;
    txt = txt + " ";
    if (txt){
        final = "";
        var base = [];
        base[0] = [];
        espacio = 0;
        piso = 1;
        i = 0
        let x = 0;
        numero = "";
        while (x < txt.length) {
            char = txt.charAt(x);
            numero = numero + char;
            if (char == " ") {
                base[piso - 1][i] = numero;
                numero = "";
                espacio++;
                if (espacio == piso) {
                    final = final + " <br>";
                    espacio = 0;
                    base[piso] = [];
                    i = 0;
                    piso++;
                }
                else {
                    final = final + " "
                    i++;
                }
            }
            else {
                final = final + char;
            }
            x++;
        }
        let y = 0;
        final = final + "<br>Matriz<br>";
        while (y < base.length) {
            let z = 0;
            while (base[y][z]) {
                final = final + base[y][z];
                z++;
            }
            final = final + "<br>"
            y++;
        }
        rest.innerHTML = final
    }
    else {
        rest.innerHTML = "Solo numeros."
    }
}