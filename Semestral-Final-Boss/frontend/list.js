(() => {
    const  Algorithm = {
        htmlElements: {
            total: document.getElementById("total"),
        },
        init: () => {
            Algorithm.methods.startup();
        },
        methods: {
            startup: (e) => {
                Algorithm.methods.getPyramids();
            },
            async getPyramids(){
                const { data } = await axios.get("http://localhost:4567/pyramids");
                text = " ";
                if (data.pyramids.length > 0) {
                    for (let render = 0; render < data.pyramids.length; render++) {
                        text += "<a href=\"individual.html?q=" + data.pyramids[render].id + "\"><div class=enlace><div class=fila><img src=\"icon.png\" alt=\"py_icon\" class=\"icon\"><h3>Pirámide #" + data.pyramids[render].id + "</h3></div><h4>Tamaño: " + data.pyramids[render].tamano + "</h4><h4>Sumatoria: " + data.pyramids[render].total  + "</h4></div></a>";                    
                    }
                }
                else {
                    text = "<div class=exp><h2>No has ingresado una pirámide, te invito a que regreses y la calcules.</h2></div>"
                }
                Algorithm.htmlElements.total.innerHTML = text;
            }
        }
    }
    Algorithm.init();
})();
