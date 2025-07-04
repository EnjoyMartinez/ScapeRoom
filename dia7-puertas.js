
const preguntasPuertas = [
  {
    pregunta: "¿Cuál es la única letra que no aparece en ningún número del 1 al 99 escrito en español?",
    opciones: ["K", "W", "Ñ", "Z"],
    correcta: "K"
  },
  {
    pregunta: "Si una docena de huevos cuesta 1,20€, ¿cuánto cuesta medio huevo?",
    opciones: ["0,05€", "0,10€", "0,50€", "0,60€"],
    correcta: "0,05€"
  },
  {
    pregunta: "¿Qué instrumento mide la presión atmosférica?",
    opciones: ["Anemómetro", "Barómetro", "Higrómetro", "Termómetro"],
    correcta: "Barómetro"
  },
  {
    pregunta: "¿Cuántos segundos hay en un día?",
    opciones: ["8.640", "86.400", "864.000", "1.440"],
    correcta: "86.400"
  },
  {
    pregunta: "¿Cuál es el metal más ligero?",
    opciones: ["Litio", "Aluminio", "Plomo", "Titanio"],
    correcta: "Litio"
  },
  {
    pregunta: "¿Qué filósofo escribió *La República*?",
    opciones: ["Sócrates", "Aristóteles", "Platón", "Epicuro"],
    correcta: "Platón"
  },
  {
    pregunta: "¿Cuántos lados tiene un dodecágono?",
    opciones: ["10", "12", "14", "16"],
    correcta: "12"
  },
  {
    pregunta: "¿Qué país no tiene ejército desde 1949?",
    opciones: ["Costa Rica", "Panamá", "Islandia", "Suiza"],
    correcta: "Costa Rica"
  },
  {
    pregunta: "¿Cuál es el símbolo químico del oro?",
    opciones: ["Ag", "Au", "Gd", "Go"],
    correcta: "Au"
  },
  {
    pregunta: "¿Qué palabra se lee igual de izquierda a derecha que de derecha a izquierda?",
    opciones: ["Solos", "Rana", "Casa", "Ratón"],
    correcta: "Solos"
  },
  {
    pregunta: "¿Qué número representa la letra 'M' en números romanos?",
    opciones: ["500", "1000", "50", "100"],
    correcta: "1000"
  },
  {
    pregunta: "¿Qué planeta tiene un día más largo que su año?",
    opciones: ["Mercurio", "Venus", "Júpiter", "Marte"],
    correcta: "Venus"
  },
  {
    pregunta: "¿Qué parte del cuerpo humano sigue creciendo después de la muerte?",
    opciones: ["Pelo", "Uñas", "Ambos", "Ninguno"],
    correcta: "Ninguno"
  },
  {
    pregunta: "¿Quién inventó el primer motor eléctrico funcional?",
    opciones: ["Tesla", "Faraday", "Edison", "Volta"],
    correcta: "Faraday"
  },
  {
    pregunta: "¿Cuál es la palabra más usada en el idioma español?",
    opciones: ["Hola", "Que", "De", "El"],
    correcta: "El"
  },
  {
    pregunta: "¿Qué animal puede dormir con un ojo abierto?",
    opciones: ["El perro", "El delfín", "El gato", "La lechuza"],
    correcta: "El delfín"
  }
];

let pasoActual = 0;

function iniciarJuego() { mostrarPregunta(); }

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
  document.getElementById("thinking").style.display = "block";
  setTimeout(() => {
    document.getElementById("thinking").style.display = "none";
    const correcta = preguntasPuertas[pasoActual].correcta;
    if (opcion === correcta) {
      pasoActual++;
      if (pasoActual >= preguntasPuertas.length) { mostrarGanador(); }
      else { mostrarPregunta(); }
    } else { mostrarFallo(); }
  }, 1000);
}

function mostrarFallo() {
  document.getElementById("app").innerHTML = `
    <h2>¡Oh no! Fallaste 😢</h2>
    <img src="imagenes/triste.png" style="width: 150px;"><br/>
    <p>Volviendo al principio...</p>`;
  pasoActual = 0;
  setTimeout(mostrarPregunta, 3000);
}

function mostrarGanador() {
  document.getElementById("app").innerHTML = `
    <h2>🎉 ¡Has ganado!</h2>
    <img src="imagenes/ganadora.png" style="width: 200px;"><br/>
    <p>Has superado todas las puertas.</p>`;
  setTimeout(() => {
    localStorage.setItem("dia7", "completo");
    alert("🎊 ¡Día 7 completado!");
    location.reload();
  }, 3000);
}

iniciarJuego();
