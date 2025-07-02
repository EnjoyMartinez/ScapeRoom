
const preguntasPuertas = [
  {
    pregunta: "¿Cuál es la capital de Francia?",
    opciones: ["Madrid", "París", "Roma", "Berlín"],
    correcta: "París"
  },
  {
    pregunta: "¿Qué animal ladra?",
    opciones: ["Gato", "Perro", "Vaca", "Pato"],
    correcta: "Perro"
  },
  {
    pregunta: "¿Cuál es el color del cielo?",
    opciones: ["Rojo", "Verde", "Azul", "Negro"],
    correcta: "Azul"
  },
  {
    pregunta: "¿Cuántas patas tiene una araña?",
    opciones: ["4", "6", "8", "10"],
    correcta: "8"
  },
  {
    pregunta: "¿Qué fruta es amarilla?",
    opciones: ["Manzana", "Plátano", "Fresa", "Uva"],
    correcta: "Plátano"
  },
  {
    pregunta: "¿Cuál es el día después del lunes?",
    opciones: ["Domingo", "Miércoles", "Martes", "Viernes"],
    correcta: "Martes"
  },
  {
    pregunta: "¿Qué número es par?",
    opciones: ["3", "7", "9", "2"],
    correcta: "2"
  },
  {
    pregunta: "¿Qué estación es más calurosa?",
    opciones: ["Verano", "Invierno", "Otoño", "Primavera"],
    correcta: "Verano"
  }
];

let pasoActual = 0;

function iniciarDia5Puertas() {
  mostrarPregunta();
}

function mostrarPregunta() {
  const pregunta = preguntasPuertas[pasoActual];
  let html = `<h2>${pregunta.pregunta}</h2>`;
  html += `<div id="puertas" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px;">`;

  pregunta.opciones.forEach(op => {
    html += `
      <div onclick="verificarRespuesta('${op}')" style="cursor:pointer; text-align:center;">
        <img src="imagens/puerta.png" style="width: 80px; height: 120px;"><br>${op}
      </div>`;
  });

  html += `</div><img src="imagens/duda.png" id="thinking" style="position:fixed; bottom:10px; right:10px; width:60px; display:none;">`;

  document.getElementById("app").innerHTML = html;
}

function verificarRespuesta(opcion) {
  document.getElementById("thinking").style.display = "block";

  setTimeout(() => {
    document.getElementById("thinking").style.display = "none";

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
    <img src="imagens/triste.png" style="width: 150px;"><br/>
    <p>Volviendo al principio...</p>
  `;
  pasoActual = 0;
  setTimeout(mostrarPregunta, 3000);
}

function mostrarGanador() {
  document.getElementById("app").innerHTML = `
    <h2>🎉 ¡Has ganado!</h2>
    <img src="imagens/ganador.png" style="width: 200px;"><br/>
    <p>Has superado todas las puertas.</p>
  `;
  setTimeout(() => {
    localStorage.setItem("dia5", "completo");
    alert("🎊 ¡Día 5 completado!");
    location.reload();
  }, 3000);
}

iniciarDia5Puertas();
