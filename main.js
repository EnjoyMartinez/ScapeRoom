
const app = document.getElementById('app');
const startDate = new Date('2025-06-27T00:00:00');

const days = {};
for (let i = 1; i <= 11; i++) {
  const pruebas = (i === 1) ? [
    { tipo: "texto", contenido: "¿Dónde nos conocimos por primera vez?", respuesta: "LUXUS" },
    { tipo: "texto", contenido: "¿Dónde fue nuestra primera cita?", respuesta: "En el parque de las burgas" },
    { tipo: "texto", contenido: "¿Cómo te llamo con amor?", respuesta: "Pichurrina" },
    { tipo: "texto", contenido: "¿Cómo nos llamamos de broma?", respuesta: "Maricon/a" },
    { tipo: "texto", contenido: "¿Quién es nuestro westy?", respuesta: "Tommy" }
  ] : [
    { tipo: "texto", contenido: `Adivina esta palabra clave del día ${i}`, respuesta: `respuesta${i}` },
    { tipo: "binario", contenido: "01010100 01100101 00100000 01100001 01101101 01101111", respuesta: "Te amo" },
    { tipo: "morse", contenido: "- . -- ---", respuesta: "Temo" },
    { tipo: "sentimental", contenido: "Un momento bonito contigo fue... (escribe algo)", respuesta: "libre" },
    { tipo: "secreto", contenido: `Introduce el número mágico del día ${i}`, respuesta: `${100 + i}` }
  ];
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
    html += `<input type='text' id='respuesta${i}' placeholder='Tu respuesta...' />`;
  });
  html += `<button onclick='verificar("${dayKey}")'>Comprobar respuestas</button>`;
  app.innerHTML = html;
}

function verificar(dayKey) {
  const data = days[dayKey];
  let todoBien = true;
  data.pruebas.forEach((p, i) => {
    const valor = document.getElementById('respuesta' + i).value.trim().toLowerCase();
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
