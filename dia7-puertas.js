
const preguntasPuertas = [{'pregunta': 'Pregunta difícil 1', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 2', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 3', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 4', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 5', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 6', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 7', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 8', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 9', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 10', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 11', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 12', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 13', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 14', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 15', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}, {'pregunta': 'Pregunta difícil 16', 'opciones': ['A', 'B', 'C', 'D'], 'correcta': 'A'}];

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
