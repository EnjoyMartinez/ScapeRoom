
const preguntasPuertas = [
  {
    pregunta: "Si un avión se estrella justo en la frontera entre Francia y España, ¿dónde entierran a los supervivientes?",
    opciones: ["En Francia", "En España", "En ambos", "No se entierran"],
    correcta: "No se entierran"
  },
  {
    pregunta: "¿Qué número sigue en esta serie? 1, 1, 2, 3, 5, 8, ...",
    opciones: ["11", "13", "15", "21"],
    correcta: "13"
  },
  {
    pregunta: "¿Cuál es la palabra que está mal escrita en todos los diccionarios?",
    opciones: ["Error", "Equivocado", "Mal", "Mal escrita"],
    correcta: "Mal escrita"
  },
  {
    pregunta: "Tienes una cerilla y entras en una cabaña oscura. Dentro hay una vela, una lámpara de aceite y una chimenea. ¿Qué enciendes primero?",
    opciones: ["La vela", "La lámpara", "La cerilla", "La chimenea"],
    correcta: "La cerilla"
  },
  {
    pregunta: "Si 5 máquinas hacen 5 piezas en 5 minutos, ¿cuánto tardan 100 máquinas en hacer 100 piezas?",
    opciones: ["5 minutos", "100 minutos", "50 minutos", "1 minuto"],
    correcta: "5 minutos"
  },
  {
    pregunta: "¿Cuál es el planeta más cercano al Sol?",
    opciones: ["Venus", "Tierra", "Marte", "Mercurio"],
    correcta: "Mercurio"
  },
  {
    pregunta: "¿Qué pesa más: 1 kg de plomo o 1 kg de plumas?",
    opciones: ["El plomo", "Las plumas", "Pesan lo mismo", "Depende del volumen"],
    correcta: "Pesan lo mismo"
  },
  {
    pregunta: "¿Cuál de estas palabras es un palíndromo?",
    opciones: ["Radar", "Camión", "Papel", "Casa"],
    correcta: "Radar"
  }
];


let pasoActual = 0;

function iniciarDia5Puertas() {
  mostrarPregunta();
}

function mostrarPregunta() {
  const pregunta = preguntasPuertas[pasoActual];
  let html = `<h2>${pregunta.pregunta}</h2>`;
  html += `<div id="puertas" class="puertas-container">`;

  pregunta.opciones.forEach(op => {
    html += `
      <div onclick="verificarRespuesta('${op}')" class="puerta-opcion">
        <img src="imagenes/puerta.png" alt="puerta"><br>${op}
      </div>`;
  });

  html += `</div><img src="imagenes/duda.png" id="thinking" class="thinking-img">`;

  document.getElementById("app").innerHTML = html;
}


function verificarRespuesta(opcion) {

  setTimeout(() => {

    const correcta = preguntasPuertas[pasoActual].correcta;

    if (opcion === correcta) {
      pasoActual++;
      if (pasoActual >= preguntasPuertas.length) {
        mostrarGanador();
      } else {
        mostrarPregunta();
      }
    } else {
      mostrarFallo();
    }
  }, 1000);
}

function mostrarFallo() {
  document.getElementById("app").innerHTML = `
    <h2>¡Oh no! Fallaste 😢</h2>
    <img src="imagenes/triste.png" style="width: 150px;"><br/>
    <p>Volviendo al principio...</p>
  `;
  pasoActual = 0;
  setTimeout(mostrarPregunta, 3000);
}

function mostrarGanador() {
  document.getElementById("app").innerHTML = `
    <h2>🎉 ¡Has ganado!</h2>
    <img src="imagenes/ganadora.png" style="width: 200px;"><br/>
    <p>Has superado todas las puertas.</p>
  `;
  setTimeout(() => {
    localStorage.setItem("dia5", "completo");
    alert("🎊 ¡Día 5 completado!");
    location.reload();
  }, 3000);
}

iniciarDia5Puertas();
