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
      { tipo: "drag", contenido: "Relaciona: Sanxenxo → ?, Madrid → ?, Tu casa → ?, Deporte → ?", respuesta: "Tu casa:Tommy,Madrid:Pulpeira,Sanxenxo:Cita,Deporte:Paddel" },
      { tipo: "opciones", contenido: "¿Qué representa el emoji 🏖?", opciones: ["El gym", "Cuando me dices que me quieres", "Nuestra comida favorita", "Uno de nuestros sitios prefes (la playa)"], respuesta: "Uno de nuestros sitios prefes (la playa)" },
      { tipo: "binario", contenido: "01010100 01100101 00100000 01100101 01110011 01110100 01100001 00100000 01100111 01110101 01110011 01110100 01100001 01101110 01100100 01101111 00100000 01110000 01101001 01100011 01101000 01110101 01110010 01110010 01101001 01101110 01100001 00111111 ", respuesta: "Te esta gustando pichurrina?" }
    ];
  } else if (i === 3) {
    pruebas = [
      { tipo: "texto", contenido: "Suma los dígitos del candado del día anterior (DDMM) y escribe el resultado", respuesta: "13" },
      { tipo: "texto", contenido: "Convierte los dígitos del candado del día anterior en letras del abecedario español (A=1...Ñ=15...Z=27)", respuesta: "biaa" },
      { tipo: "opciones", contenido: "¿Qué letra corresponde al número 15 en el abecedario español?", opciones: ["Ñ", "N", "O", "M"], respuesta: "Ñ" },
      { tipo: "candado", contenido: "Introduce la suma de 2+3+0+6 (usa el candado)", respuesta: "11" },
      { tipo: "libre", contenido: "Escribe una frase que resuma cómo te has sentido haciendo este juego" }
    ];
  } else if (i === 4) {
    pruebas = [
      { tipo: "texto", contenido: "🕵️‍♂️ Prueba 1: Descifra este anagrama: 'GANAR NA MANZALA'", respuesta: "la gran manzana" },
      { tipo: "texto", contenido: "🔐 Prueba 2: Usando la respuesta anterior como clave Vigenère, descifra: 'ZICVTWQNGRZGVTWAVZHCQYGLMGJ'", respuesta: "bienvenidoalagranmanzana" },
      { tipo: "candado", contenido: "🎯 Prueba 3: Cuenta las letras únicas en la respuesta anterior y multiplica por 2. Usa el candado para poner el número", respuesta: "26" },
      { tipo: "binario", contenido: "💻 Prueba 4: Traduce este binario a texto (usa ASCII): '01000001 01101110 01110100 01101001 01100111 01110101 01100001'", respuesta: "Antigua" },
      { tipo: "morse", contenido: "📡 Prueba 5: Traduce este mensaje en morse: '.- .-. - . -- .. ... ..-'", respuesta: "artemisu" }
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
  html += "<br/><br/><a href='admin.html'>📩 Ver respuestas</a>";
  app.innerHTML = html;
}

function renderDay(dayKey) {
  const data = days[dayKey];
  if (!data) {
    app.innerHTML = "<h1>⏳ Aún no se ha desbloqueado el siguiente bloque</h1>";
    return;
  }

  let html = `<h1>${data.mensaje}</h1>`;

  data.pruebas.forEach((p, i) => {
    html += `<div><b>Prueba ${i + 1} (${p.tipo}):</b><br/>${p.contenido}</div>`;

    if (p.tipo === 'opciones') {
      p.opciones.forEach((op, j) => {
        html += `<div><input type='radio' name='respuesta${i}' value='${op}' id='r${i}_${j}'><label for='r${i}_${j}'> ${op}</label></div>`;
      });
    } else if (p.tipo === 'candado') {
      html += `<input type='number' id='respuesta${i}' placeholder='Ej: 2306' />`;
    } else if (p.tipo === 'candado-ui') {
      html += `<div id="candado-ui">`;
      for (let j = 0; j < 4; j++) {
        html += `
          <div>
            <button onclick="modificarDigito(${i}, ${j}, 1)">+</button><br/>
            <span id="digit-${i}-${j}">0</span><br/>
            <button onclick="modificarDigito(${i}, ${j}, -1)">-</button>
          </div>`;
      }
      html += `</div>`;
    } else if (p.tipo === 'drag') {
      const frases = ["Deporte", "Tu casa", "Sanxenxo", "Madrid"];
      const respuestas = ["Cita", "Pulpeira", "Tommy", "Paddel"];
      html += `
        <div class="drag-container">
          <div class="drag-col" id="drop-col-${i}">
            ${frases.map((f) => `<div class="drop-zone" data-frase="${f}">${f}</div>`).join("")}
          </div>
          <div class="drag-col" id="drag-col-${i}">
            ${respuestas.map(r => `<div class="draggable" draggable="true">${r}</div>`).join("")}
          </div>
        </div>
      `;
    }   else if (p.tipo === 'emoji') {
      html += `<input type='text' id='respuesta${i}' placeholder='Tu respuesta... (Ej: miedo)' />`;
    } else if (p.tipo === 'palabra-escondida') {
      html += `<p style="font-weight:bold">${p.contenido}</p>`;
      html += `<input type='text' id='respuesta${i}' placeholder='Palabra oculta...' />`;
    } else if (p.tipo === 'codigo-colores') {
      html += `<p>🎨 Código: Rojo-Azul-Verde</p>`;
      html += `<input type='text' id='respuesta${i}' placeholder='Ej: RGB' />`;
    } else if (p.tipo === 'texto-oculto') {
      html += `<button onclick="alert('🎁 ¡Sorpresa! Esta es la palabra clave 😉')" class="texto-oculto" id='respuesta${i}'>Haz click</button>`;
    }
    else {
      html += `<input type='text' id='respuesta${i}' placeholder='Tu respuesta...' />`;
    }
  });

  html += `<button onclick='verificar("${dayKey}")'>Comprobar respuestas</button>`;
  app.innerHTML = html;

  inicializarDragAndDrop();
}

function modificarDigito(pIndex, dIndex, cambio) {
  const id = `digit-${pIndex}-${dIndex}`;
  let valor = parseInt(document.getElementById(id).innerText);
  valor = (valor + cambio + 10) % 10;
  document.getElementById(id).innerText = valor;
}

function obtenerCandadoRespuesta(pIndex) {
  return Array.from({ length: 4 }, (_, j) => document.getElementById(`digit-${pIndex}-${j}`).innerText).join('');
}

let intentosFallidosDia4Prueba2 = 0;

function verificar(dayKey) {
  const data = days[dayKey];
  let todoBien = true;

  data.pruebas.forEach((p, i) => {
    let valor = "";

    if (p.tipo === 'opciones') {
      const selected = document.querySelector(`input[name='respuesta${i}']:checked`);
      valor = selected ? selected.value.trim().toLowerCase() : '';
    } else if (p.tipo === 'candado-ui') {
      valor = obtenerCandadoRespuesta(i);
    } else if (p.tipo === 'drag') {
      const zonas = document.querySelectorAll(`#drop-col-${i} .drop-zone`);
      const paresJugador = [];
      zonas.forEach(z => {
        const frase = z.dataset.frase;
        const texto = z.textContent.replace(frase, "").trim();
        paresJugador.push(`${frase}:${texto}`);
      });

      const paresCorrectos = p.respuesta.split(",").map(e => e.trim());
      const correctas = paresJugador.filter(p => paresCorrectos.includes(p));
      if (correctas.length !== paresCorrectos.length) {
        todoBien = false;
      }
      return;
    } else if (p.tipo === 'texto-oculto') {
      // El botón no tiene campo input, así que asumimos la respuesta correcta
      valor = p.respuesta.toLowerCase();
    } else {
      const input = document.getElementById('respuesta' + i);
      if (input) valor = input.value.trim().toLowerCase();
    }

    const esLibre = ['sentimental', 'libre'].includes(p.tipo);

    if (!esLibre && valor.toLowerCase() !== (p.respuesta || "").toLowerCase()) {
      todoBien = false;

      // Día 4, Prueba 2 → pista tras 3 fallos
      if (dayKey === 'dia4' && i === 1) {
        intentosFallidosDia4Prueba2++;
        if (intentosFallidosDia4Prueba2 >= 3) {
          alert("💡 Pista: Usa como clave Vigenère la ciudad del anagrama de la Prueba 1. Es conocida como 'La Gran Manzana' 🍎");
        }
      }
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

function inicializarDragAndDrop() {
  const draggables = document.querySelectorAll(".draggable");
  const dropZones = document.querySelectorAll(".drop-zone");

  draggables.forEach(d => {
    d.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", d.textContent);
    });
  });

  dropZones.forEach(z => {
    z.addEventListener("dragover", e => e.preventDefault());
    z.addEventListener("drop", e => {
      e.preventDefault();
      const texto = e.dataTransfer.getData("text/plain");
      const original = z.dataset.frase;
      const correcto = days.dia2.pruebas.find(p => p.tipo === "drag").respuesta;
      const pares = correcto.split(",");
      const esperado = pares.find(p => p.startsWith(original))?.split(":")[1];
      if (texto === esperado) {
        z.textContent = `${original}: ${texto}`;
        z.classList.add("correcto");
      } else {
        z.classList.add("incorrecto");
        setTimeout(() => location.reload(), 1000);
      }
    });
  });
}

renderHome();

// Reemplazamos el Día 5 por una prueba especial de puertas
// Cada pregunta tiene 4 puertas. Si falla, muestra triste.png y reinicia.
// Si acierta las 8, muestra ganadora.png

const preguntasPuertas = [
  {
    pregunta: "¿Dónde nos vimos por primera vez?",
    opciones: ["Rapizz", "Sanxenxo", "LUXUS", "MercaMas"],
    correcta: "LUXUS"
  },
  {
    pregunta: "¿Cómo se llama nuestro perro?",
    opciones: ["Nino", "Max", "Rocky", "Tommy"],
    correcta: "Tommy"
  },
  {
    pregunta: "¿Qué comida favorita compartimos?",
    opciones: ["Pizza del Rapizz", "Ensalada", "Pasta con pollo", "Croquetas"],
    correcta: "Pizza del Rapizz"
  },
  {
    pregunta: "¿Dónde fue nuestra primera cita?",
    opciones: ["Museo", "Sanxenxo", "Playa de las Catedrales", "Parque de las Burgas"],
    correcta: "Parque de las Burgas"
  },
  {
    pregunta: "¿Cómo te llamo cariñosamente?",
    opciones: ["Bichito", "Pichurrina", "Mi vida", "Rubia"],
    correcta: "Pichurrina"
  },
  {
    pregunta: "¿Cuál es nuestra broma interna?",
    opciones: ["Tontita", "Maricona", "Payasita", "Loca"],
    correcta: "Maricona"
  },
  {
    pregunta: "¿Qué representa el emoji 🏖 para nosotros?",
    opciones: ["Playa favorita", "Tú", "Vacaciones con Tommy", "Rapizz"],
    correcta: "Playa favorita"
  },
  {
    pregunta: "¿Cuál es nuestro sitio favorito para cenar?",
    opciones: ["Rapizz", "Casa Pepe", "Dominos", "Furancho de Lola"],
    correcta: "Rapizz"
  }
];

function renderPuertas() {
  let current = 0;
  let timeoutRef;

  function mostrarPregunta(i) {
    const p = preguntasPuertas[i];
    let html = `
      <h2>Pregunta ${i + 1}</h2>
      <p>${p.pregunta}</p>
      <div class="puertas-container">
        ${p.opciones.map((op, idx) => `
          <div class="puerta" onclick="verificarPuerta(${i}, '${op}')">
            <img src="imagenes/puerta.png" alt="Puerta ${idx + 1}" />
            <span class="etiqueta">${op}</span>
          </div>
        `).join('')}
      </div>
      <div id="personaje">
        <img src="imagenes/duda.png" alt="Pensando..." id="img-pj" style="display:none;" />
      </div>
    `;
    app.innerHTML = html;

    // Si pasa 30 segundos, se muestra personaje pensativo
    timeoutRef = setTimeout(() => {
      const img = document.getElementById("img-pj");
      if (img) img.style.display = "block";
    }, 30000);
  }

  window.verificarPuerta = (i, elegida) => {
    clearTimeout(timeoutRef);
    const correcta = preguntasPuertas[i].correcta;
    if (elegida === correcta) {
      current++;
      if (current < preguntasPuertas.length) {
        mostrarPregunta(current);
      } else {
        app.innerHTML = `
          <h2>✨ ¡Lo lograste! ¡Has superado todas las puertas! ✨</h2>
          <img src="imagenes/ganadora.png" alt="Ganadora feliz" class="final-img" />
          <br><button onclick="marcarDia5Completo()">Continuar</button>
        `;
      }
    } else {
      app.innerHTML = `
        <h2>❌ Oh no... esa no era la puerta correcta</h2>
        <img src="imagenes/triste.png" alt="Triste" class="final-img" />
        <br><button onclick="renderPuertas()">Volver a intentarlo</button>
      `;
    }
  }

  mostrarPregunta(current);
}

function marcarDia5Completo() {
  localStorage.setItem("dia5", "completo");
  alert("🎉 Día 5 completado");
  location.reload();
}

// Actualizamos botón Día 5 en renderHome()
const originalRenderHome = renderHome;
renderHome = function () {
  let html = "<h1>🌟 Elige un día desbloqueado 🌟</h1>";
  const today = new Date();
  for (let i = 1; i <= 11; i++) {
    const key = `dia${i}`;
    const unlockDate = new Date(startDate);
    unlockDate.setDate(startDate.getDate() + i - 1);
    const completado = localStorage.getItem(key) === 'completo';
    const prevDone = i === 1 || localStorage.getItem(`dia${i - 1}`) === 'completo';
    if (today >= unlockDate && prevDone) {
      if (i === 5) {
        html += `<button onclick='renderPuertas()'>Día 5 ${completado ? "✅" : ""}</button>`;
      } else {
        html += `<button onclick='renderDay("${key}")'>Día ${i} ${completado ? "✅" : ""}</button>`;
      }
    } else {
      html += `<button disabled>Día ${i} 🔒</button>`;
    }
  }
  html += "<br/><br/><a href='admin.html'>📩 Ver respuestas</a>";
  app.innerHTML = html;
};

