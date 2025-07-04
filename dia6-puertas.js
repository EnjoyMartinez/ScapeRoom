
const preguntasPuertas = [{'pregunta': '¿Qué ocurre una vez en un minuto, dos veces en un momento, pero nunca en mil años?', 'opciones': ['La letra M', 'Un eclipse', 'Un milagro', 'Una casualidad'], 'correcta': 'La letra M'}, {'pregunta': 'Si te doy dos manzanas y luego te quito una, ¿cuántas tienes?', 'opciones': ['1', '2', '3', 'Depende de cuántas tenía antes'], 'correcta': '2'}, {'pregunta': '¿Qué tiene cabeza, pero no ojos, ni boca, ni nariz?', 'opciones': ['Una estatua', 'Un alfiler', 'Una serpiente', 'Una moneda'], 'correcta': 'Un alfiler'}, {'pregunta': '¿Cuál es el resultado correcto de esta operación?: 3 + 2 × (6 – 4)² ÷ 2', 'opciones': ['5', '7', '11', '9'], 'correcta': '11'}, {'pregunta': '¿Cuál es la capital de Mongolia?', 'opciones': ['Astana', 'Ulán Bator', 'Bakú', 'Tiflis'], 'correcta': 'Ulán Bator'}, {'pregunta': '¿Cuántos ceros tiene mil millones?', 'opciones': ['6', '9', '12', '3'], 'correcta': '9'}, {'pregunta': 'Si un tren eléctrico va hacia el norte y el viento sopla hacia el oeste, ¿hacia dónde va el humo?', 'opciones': ['Norte', 'Sur', 'Este', 'No hay humo'], 'correcta': 'No hay humo'}, {'pregunta': '¿Qué animal camina con cuatro patas por la mañana, dos al mediodía y tres por la tarde?', 'opciones': ['El perro', 'El hombre', 'La araña', 'El caballo'], 'correcta': 'El hombre'}, {'pregunta': '¿Cuál es la palabra más larga del idioma español aceptada por la RAE?', 'opciones': ['Electroencefalografista', 'Esternocleidomastoideo', 'Supercalifragilistico', 'Anticonstitucionalmente'], 'correcta': 'Electroencefalografista'}, {'pregunta': "¿Qué filósofo dijo 'Solo sé que no sé nada'?", 'opciones': ['Platón', 'Aristóteles', 'Sócrates', 'Descartes'], 'correcta': 'Sócrates'}, {'pregunta': '¿Cuál es el único número primo par?', 'opciones': ['0', '1', '2', '4'], 'correcta': '2'}, {'pregunta': '¿Qué país tiene forma de bota?', 'opciones': ['España', 'Italia', 'Grecia', 'Brasil'], 'correcta': 'Italia'}, {'pregunta': '¿Quién pintó la Capilla Sixtina?', 'opciones': ['Da Vinci', 'Miguel Ángel', 'Van Gogh', 'Rafael'], 'correcta': 'Miguel Ángel'}, {'pregunta': '¿Cuál es el río más largo del mundo según muchos geógrafos?', 'opciones': ['Nilo', 'Amazonas', 'Yangtsé', 'Misisipi'], 'correcta': 'Amazonas'}, {'pregunta': '¿Cuál es el número romano de 50?', 'opciones': ['V', 'X', 'L', 'C'], 'correcta': 'L'}, {'pregunta': '¿Cuántos minutos hay en 2 horas y media?', 'opciones': ['120', '150', '180', '90'], 'correcta': '150'}];

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
    localStorage.setItem("dia6", "completo");
    alert("🎊 ¡Día 6 completado!");
    location.reload();
  }, 3000);
}

iniciarJuego();
