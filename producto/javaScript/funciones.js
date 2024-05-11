function validarNombre() {
    let nombre = document.querySelector("#id_nombre_cli");
    var letras = /^[A-Za-z]+$/;
    if (id_nombre_cli.value.length > ) {
        if (id_nombre_cli.value.match(letras)) {
            id_nombre_cli.classList.add("correct");
            id_nombre_cli.classList.remove("incorrect");
            document.querySelector("#error-id_nombre_cli").innerHTML = "&nbsp;";
        }else {
            id_nombre_cli.classList.add("incorrect");
            id_nombre_cli.classList.remove("correct");
            document.querySelector("#error-id_nombre_cli")
                .innerHTML = "Error, ingrese solo letras.";
        }
    }else {
        id_nombre_cli.classList.add("incorrect");
        id_nombre_cli.classList.remove("correct");
        document.querySelector("#error-id_nombre_cli")
            .innerHTML = "Error, debes ingresar un nombre";
    }
}