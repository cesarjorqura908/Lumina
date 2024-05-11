function validarNombre() {
    let nombre = document.querySelector("#id_nombre_cli");
    let letras = /^[A-Za-z]+$/;
    if (id_nombre_cli.value.length > 0) {
        if (id_nombre_cli.value.match(letras)) {
            id_nombre_cli.classList.add("correct");
            id_nombre_cli.classList.remove("incorrect");
            document.querySelector("#error-id_nombre_cli").innerHTML = "&nbsp;";
        }else {
            id_nombre_cli.classList.add("incorrect");
            id_nombre_cli.classList.remove("correct");
            document.querySelector("#error-id_nombre_cli")
                .innerHTML = "Ingrese solo letras.";
        }
    }else {
        id_nombre_cli.classList.add("incorrect");
        id_nombre_cli.classList.remove("correct");
        document.querySelector("#error-id_nombre_cli")
            .innerHTML = "Debes ingresar un nombre";
    }
}

function validarRut() {
    let rut = document.querySelector("#id_rut_cli");
    let numeros = /^[0-9]+$/;
    if (id_rut_cli.value.length === 9) {
        if (id_rut_cli.value.match(numeros)) {
            id_rut_cli.classList.add("correct");
            id_rut_cli.classList.remove("incorrect");
            document.querySelector("#error-id_rut_cli").innerHTML = "&nbsp;";
        }else {
            id_rut_cli.classList.add("incorrect");
            id_rut_cli.classList.remove("correct");
            document.querySelector("#error-id_rut_cli")
                .innerHTML = "Error, ingrese solo numeros, sin guion.";
        }
    }else {
        id_rut_cli.classList.add("incorrect");
        id_rut_cli.classList.remove("correct");
        document.querySelector("#error-id_rut_cli")
            .innerHTML = "Debes ingresar un rut valido.";
    }
}

function dolar_api (pesos, tag){
    fetch('https://mindicador.cl/api').then(function(response) {
        return response.json();
    }).then(function(dailyIndicators) {
        let dolar = parseFloat(dailyIndicators.dolar.valor);
        // let planByte = 9990;

        let precio = document.createElement("h4");
        precio.innerHTML = "$"+ pesos + " (USD "+ (pesos/dolar).toFixed(1) +")";
        document.querySelector(tag).appendChild(precio); // Agrega el h4 al elemento con id "productos"


    }).catch(function(error) {
        console.log('Requestfailed', error);
    });
}