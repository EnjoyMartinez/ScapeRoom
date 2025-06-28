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
      { tipo: "opciones", contenido: "¿Qué comida compartimos más veces?", opciones: ["Sushi", "Pizza del Rapizz", "Ensalada", "Croquetas"], respuesta: "Pizza del Rapizz" },
      { tipo: "opciones", contenido: "¿Qué canción podría sonar mientras cocinamos?", opciones: ["Despechá", "La Bachata", "La Inocente", "Todo de ti"], respuesta: "La Inocente" },
      { tipo: "opciones", contenido: "¿Cuál fue el primer viaje que hicimos juntos?", opciones: ["Santiago", "Sanxenxo", "Vigo", "O Grove"], respuesta: "Sanxenxo" },
      { tipo: "candado", contenido: "¿Qué día exacto nos conocimos? (formato DDMM)", respuesta: "2306" },
      { tipo: "relacionar", contenido: "Relaciona: Sanxenxo → ?, LUXUS → ?, Tu casa → ?, Rapizz → ?", respuesta: "Sanxenxo:Beso,LUXUS:Primera vez,Tu casa:Siesta,Rapizz:Pizza" },
      { tipo: "opciones", contenido: "¿Qué representa el emoji 🏖?", opciones: ["Nuestro perrito", "Cuando me dices que me quieres", "Nuestra comida favorita", "El lugar del primer beso"], respuesta: "El lugar del primer beso" },
      { tipo: "binario", contenido: "01010100 01100101 00100000 01100001 01101101 01101111", respuesta: "Te amo" }
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
    html += `<div><b>Prueba ${i + 1} (${p.tipo}):</b><br/>${p.contenido}</div>`;
    if (p.tipo === 'opciones') {
      p.opciones.forEach((op, j) => {
        html += `<div><input type='radio' name='respuesta${i}' value='${op}' id='r${i}_${j}'><label for='r${i}_${j}'> ${op}</label></div>`;
      });
    } else if (p.tipo === 'candado') {
      html += `<input type='number' id='respuesta${i}' placeholder='Ej: 2306' />`;
    } else {
      html += `<input type='text' id='respuesta${i}' placeholder='Tu respuesta...' />`;
    }
  });
  html += `<button onclick='verificar("${dayKey}")'>Comprobar respuestas</button>`;
  app.innerHTML = html;
}

function verificar(dayKey) {
  const data = days[dayKey];
  let todoBien = true;
  data.pruebas.forEach((p, i) => {
    let valor;
    if (p.tipo === 'opciones') {
      const selected = document.querySelector(`input[name='respuesta${i}']:checked`);
      valor = selected ? selected.value.trim().toLowerCase() : '';
    } else {
      valor = document.getElementById('respuesta' + i).value.trim().toLowerCase();
    }
    if (p.tipo !== 'sentimental' && valor !== p.respuesta.toLowerCase()) {
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
