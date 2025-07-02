// Día 5: Prueba especial de puertas
// Esta función se añade al resto del juego, no reemplaza otros días

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

// Para que no borre los otros días, solo redireccionamos el botón del Día 5
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
