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

function validarTelefono() {
    let telefono = document.querySelector("#id_telefono_cli");
    let numeros = /^[0-9]+$/;
    if (id_telefono_cli.value.length === 9) {
        if (id_telefono_cli.value.match(numeros)) {
            id_telefono_cli.classList.add("correct");
            id_telefono_cli.classList.remove("incorrect");
            document.querySelector("#error-id_telefono_cli").innerHTML = "&nbsp;";
        }else {
            id_telefono_cli.classList.add("incorrect");
            id_telefono_cli.classList.remove("correct");
            document.querySelector("#error-id_telefono_cli")
                .innerHTML = "Error, ingrese solo numeros, sin guion.";
        }
    }else {
        id_telefono_cli.classList.add("incorrect");
        id_telefono_cli.classList.remove("correct");
        document.querySelector("#error-id_telefono_cli")
            .innerHTML = "Debes ingresar un telefono valido.";
    }
}

function validarCorreo() {
    let nombre = document.querySelector("#id_correo_cli");
    let letras = /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;
    if (id_correo_cli.value.length > 0) {
        if (id_correo_cli.value.match(letras)) {
            id_correo_cli.classList.add("correct");
            id_correo_cli.classList.remove("incorrect");
            document.querySelector("#error-id_correo_cli").innerHTML = "&nbsp;";
        }else {
            id_correo_cli.classList.add("incorrect");
            id_correo_cli.classList.remove("correct");
            document.querySelector("#error-id_correo_cli")
                .innerHTML = "Ingrese un correo";
        }
    }else {
        id_correo_cli.classList.add("incorrect");
        id_correo_cli.classList.remove("correct");
        document.querySelector("#error-id_correo_cli")
            .innerHTML = "Debes ingresar un correo";
    }
}

function dolar_api (pesos, tag){
    fetch('https://mindicador.cl/api').then(function(response) {
        return response.json();
    }).then(function(dailyIndicators) {
        let dolar = parseFloat(dailyIndicators.dolar.valor);
        let precio = document.createElement("h4");
        precio.innerHTML = "$"+ pesos +"/mes" +" (USD "+ (pesos/dolar).toFixed(1) +")";
        document.querySelector(tag).appendChild(precio); // Agrega el h4 al elemento con id "productos"


    }).catch(function(error) {
        console.log('Requestfailed', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
        obtenerChiste(); // Llama a la función obtenerChiste() cuando el DOM se haya cargado
    });

    function obtenerChiste() {
        var url = "https://v2.jokeapi.dev/joke/Any?lang=es&format=txt";

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Request failed with status " + response.status);
                }
                return response.text(); // Devuelve el chiste como texto plano
            })
            .then(function(chiste) {
                var chisteParrafo = document.getElementById("chiste-parrafo");
                chisteParrafo.textContent = chiste; // Actualiza el contenido del párrafo con el chiste obtenido
            })
            .catch(function(error) {
                console.error("Error en la solicitud:", error);
            });
    }




/*function chistes_api(){
    fetch('https://v2.jokeapi.dev/joke/Any?lang=es&format=txt').then(function(response) {
        return response.json();
    }).then(function(response) {

        var baseURL = "https://v2.jokeapi.dev/joke/Any?lang=es&format=txt";
        var categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
        var params = [
            "blacklistFlags=nsfw,religious,racist",
            "idRange=0-100"
        ];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", baseURL + "/joke/" + categories.join(",") + "?" + params.join("&"));

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status < 300) // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
            {
                var randomJoke = JSON.parse(xhr.responseText);

                var chisteParrafo = document.getElementById('chiste-parrafo');
                
                if(randomJoke.type == "single")
                {
                    // If type == "single", the joke only has the "joke" property
                    chisteParrafo.textContent = randomJoke.joke;
                }
                else
                {
                    // If type == "twopart", the joke has "setup" and "delivery" properties
                    chisteParrafo.textContent = randomJoke.setup + " " + randomJoke.delivery;
                }
            }
            else if(xhr.readyState == 4)
            {
                var chisteParrafo = document.getElementById('chiste-parrafo');
                chisteParrafo.textContent = "Error while requesting joke. Status code: " + xhr.status + ". Server response: " + xhr.responseText;
            }
        };

        xhr.send();
       
    }).catch(function(error) {
        var chisteParrafo = document.getElementById('chiste-parrafo');
        chisteParrafo.textContent = "Request failed: " + error;
    });
} */



  