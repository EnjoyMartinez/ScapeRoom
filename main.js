
const app = document.getElementById('app');
const startDate = new Date('2025-06-27T00:00:00');

const days = {};
for (let i = 1; i <= 11; i++) {
  let pruebas = [];
  if (i === 1) {
    pruebas = [
      { tipo: "texto", contenido: "¿Dónde nos conocimos por primera vez?", respuesta: "LUXUS" },
      { tipo: "texto", contenido: "¿Dónde fue nuestra primera cita?", respuesta: "En el parque de las burgas" },
      { tipo: "texto", contenido: "¿Cómo te llamo con amor?", respuesta: "Pichurrina" },
      { tipo: "texto", contenido: "¿Cómo nos llamamos de broma?", respuesta: "Maricon/a" },
      { tipo: "texto", contenido: "¿Quién es nuestro westy?", respuesta: "Tommy" }
    ];
  } else if (i === 2) {
    pruebas = [
      { tipo: "opciones", contenido: "¿Qué comida compartimos más veces?", opciones: ["Macarrones", "Pizza del Rapizz", "Hamburguesa", "Croquetas"], respuesta: "Pizza del Rapizz" },
      { tipo: "opciones", contenido: "¿Qué canción podría sonar mientras cocinamos?", opciones: ["Queeedate", "La Bachata", "La Vaca Lola", "Todo de ti"], respuesta: "La Vaca Lola" },
      { tipo: "opciones", contenido: "¿Cuál fue el primer viaje que hicimos juntos?", opciones: ["Alicante", "Sanxenxo", "Madrid", "O Grove"], respuesta: "Sanxenxo" },
      { tipo: "candado-ui", contenido: "¿Qué día exacto nos conocimos? (formato DDMM)", respuesta: "2911" },
      { tipo: "drag", contenido: "Relaciona: Sanxenxo → ?, Madrid → ?, Tu casa → ?, Deporte → ?", respuesta: "Sanxenxo:Cita,Madrid:Pulpeira,Tu casa:Tommy,Deporte:Paddel" },
      { tipo: "opciones", contenido: "¿Qué representa el emoji 🏖?", opciones: ["El gym", "Cuando me dices que me quieres", "Nuestra comida favorita", "Uno de nuestros sitios prefes (la playa)"], respuesta: "Uno de nuestros sitios prefes (la playa)" },
      { tipo: "binario", contenido: "01010100 01100101 00100000 01100101 01110011 01110100 01100001 00100000 01100111 01110101 01110011 01110100 01100001 01101110 01100100 01101111 00100000 01110000 01101001 01100011 01101000 01110101 01110010 01110010 01101001 01101110 01100001 00111111 ", respuesta: "Te esta gustando pichurrina?" }
    ];
  } else {
    pruebas = [
      { tipo: "texto", contenido: `Adivina esta palabra clave del día ${i}`, respuesta: `respuesta${i}` },
      { tipo: "binario", contenido: "01010100 01100101 00100000 01100001 01101101 01101111", respuesta: "Te amo" },
      { tipo: "morse", contenido: "- . -- ---", respuesta: "Temo" },
      { tipo: "sentimental", contenido: "Un momento bonito contigo fue... (escribe algo)", respuesta: "libre" },
      { tipo: "secreto", contenido: `Introduce el número mágico del día ${i}`, respuesta: `${100 + i}` }
    ];
  }
  days[`dia${i}`] = { mensaje: `Día ${i} desbloqueado 💖`, pruebas };
}

function renderDay(dayKey) {
  const data = days[dayKey];
  if (!data) {
    app.innerHTML = "<h1>⏳ Aún no se ha desbloqueado el siguiente bloque</h1>";
    return;
  }

  let html = `<h1>${data.mensaje}</h1>`;

  data.pruebas.forEach((p, i) => {
    html += `<div class='pregunta'><b>Prueba ${i + 1} (${p.tipo}):</b><br/>${p.contenido}`;

    if (p.tipo === 'opciones') {
      p.opciones.forEach((op, j) => {
        html += `<div><input type='radio' name='respuesta${i}' value='${op}' id='r${i}_${j}'><label for='r${i}_${j}'> ${op}</label></div>`;
      });
    } else if (p.tipo === 'candado-ui') {
      html += `<div id="candado-ui-${i}" class="candado-ui">`;
      for (let j = 0; j < 4; j++) {
        html += `
          <div>
            <button onclick="ajustarDigito(${i}, ${j}, 1)">+</button><br/>
            <span id="digito-${i}-${j}">0</span><br/>
            <button onclick="ajustarDigito(${i}, ${j}, -1)">-</button>
          </div>
        `;
      }
      html += `</div>`;
    } else if (p.tipo === 'drag') {
      const respuestas = ["Cita", "Pulpeira", "Tommy", "Paddel"];
      const preguntas = ["Sanxenxo", "Madrid", "Tu casa", "Deporte"];
      html += `<div class="drag-container"><div class="drag-col" id="drag-origen-${i}">`;
      respuestas.forEach((r, j) => {
        html += `<div class="draggable" draggable="true" ondragstart="drag(event)" id="drag-${i}-${j}">${r}</div>`;
      });
      html += `</div><div class="drag-col" id="drag-destino-${i}" ondrop="drop(event, ${i})" ondragover="allowDrop(event)"></div></div>`;
    } else {
      html += `<input type='text' id='respuesta${i}' placeholder='Tu respuesta...' />`;
    }

    html += `</div>`;
  });

  html += `<button onclick='verificar("${dayKey}")'>Comprobar respuestas</button>`;
  app.innerHTML = html;
}

function ajustarDigito(i, j, delta) {
  const span = document.getElementById(`digito-${i}-${j}`);
  let valor = parseInt(span.textContent);
  valor = (valor + delta + 10) % 10;
  span.textContent = valor;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, i) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const elem = document.getElementById(data);
  const destino = document.getElementById(`drag-destino-${i}`);
  if (!destino.contains(elem)) destino.appendChild(elem);
}

function verificar(dayKey) {
  const data = days[dayKey];
  let todoBien = true;

  data.pruebas.forEach((p, i) => {
    let valor = "";

    if (p.tipo === 'opciones') {
      const selected = document.querySelector(`input[name='respuesta${i}']:checked`);
      valor = selected ? selected.value.trim().toLowerCase() : '';
    } else if (p.tipo === 'candado-ui') {
      for (let j = 0; j < 4; j++) {
        valor += document.getElementById(`digito-${i}-${j}`).textContent;
      }
    } else if (p.tipo === 'drag') {
      const hijos = document.getElementById(`drag-destino-${i}`).children;
      const preguntas = ["Sanxenxo", "Madrid", "Tu casa", "Deporte"];
      const respuestas = Array.from(hijos).map((h, idx) => `${preguntas[idx]}:${h.textContent}`);
      valor = respuestas.join(',');
    } else {
      const input = document.getElementById('respuesta' + i);
      valor = input ? input.value.trim().toLowerCase() : '';
    }

    if (p.tipo !== 'sentimental' && valor.toLowerCase() !== p.respuesta.toLowerCase()) {
      todoBien = false;
    }
  });

  if (todoBien) {
    localStorage.setItem(dayKey, 'completo');
    alert("🎉 ¡Bien hecho! Has completado el día.");
    location.reload();
  } else {
    alert("❌ Hay algún error, inténtalo de nuevo.");
  }
}

function renderHome() {
  let html = "<h1>🌟 Elige un día desbloqueado 🌟</h1>";
  const today = new Date();

  for (let i = 1; i <= 11; i++) {
    const key = `dia${i}`;
    const unlockDate = new Date(startDate);
    unlockDate.setDate(startDate.getDate() + i - 1);
    const completado = localStorage.getItem(key) === 'completo';
    const prevDone = i === 1 || localStorage.getItem(`dia${i - 1}`) === 'completo';

    if (today >= unlockDate && prevDone) {
      html += `<button onclick='renderDay("${key}")'>Día ${i} ${completado ? "✅" : ""}</button>`;
    } else {
      html += `<button disabled>Día ${i} 🔒</button>`;
    }
  }

  html += "<br/><br/><a href='diploma.html'>🎓 Ver diploma</a>";
  app.innerHTML = html;
}

renderHome();
