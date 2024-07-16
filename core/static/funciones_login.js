

function validarUser() {
    let user = document.querySelector("#user");
    if (user.value.length >= 2) {
        user.classList.add("correct");
        user.classList.remove("incorrect");
        document.querySelector("#error-user").innerHTML = "&nbsp;";
    } else {
        user.classList.add("incorrect");
        user.classList.remove("correct");
        document.querySelector("#error-user")
            .innerHTML = "Error, ingrese 2 caracteres mínimo.";
    }
}

function validarPass() {
    let clave = document.querySelector("#clave");
    if (clave.value.length > 2 && clave.value.length < 13) {
        clave.classList.add("correct");
        clave.classList.remove("incorrect");
        document.querySelector("#error-clave").innerHTML = "&nbsp;";
    } else {
        clave.classList.add("incorrect");
        clave.classList.remove("correct");
        document.querySelector("#error-clave")
            .innerHTML = "Error, ingrese entre 2 y 12 caracteres.";
    }
}

function validarFormulario() {
    let inputs = document.querySelectorAll("input");
    let correctos = true;
    inputs.forEach(element => {
        if (element.classList.contains("incorrect")) {
            correctos = false
        }
    });
    if (correctos) {
        document.querySelector("form").submit();
    } else {
        document.querySelector("#error-form")
            .innerHTML = "Error, revise los campos.";
    }
}