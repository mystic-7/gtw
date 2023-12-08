//Importaciones
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const { airtableGet } = require('../services/airtable-client');
const { getFlow, getFields } = require('./utils');

// Objeto para almacenar temporizadores por usuario
const timers = {};
const time = 20000;

//Flows
const flowInactividad = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { endFlow }) => {
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'sesion_cerrada').texto;
    return endFlow(mensaje);
  }
);

// Función para iniciar el temporizador
function startInactividad(ctx, gotoFlow) {
  timers[ctx.from] = setTimeout(() => {
    return gotoFlow(flowInactividad); // 🚩🚩🚩 PEGA AQUÍ TU FLUJO (en mi caso flowInactividad)
    // Aquí puedes manejar la lógica correspondiente al vencimiento del tiempo
  }, time);
}

// Función para reiniciar el temporizador
function resetInactividad(ctx, gotoFlow) {
  // Si ya hay un temporizador en marcha para el usuario, lo cancelamos
  stopInactividad(ctx);
  if (timers[ctx.from]) {
    clearTimeout(timers[ctx.from]);
  }
  // Iniciamos un nuevo temporizador
  startInactividad(ctx, gotoFlow);
}

// Función para detener el temporizador
function stopInactividad(ctx) {
  // Si hay un temporizador en marcha para el usuario, lo cancelamos
  if (timers[ctx.from]) {
    clearTimeout(timers[ctx.from]);
  }
}

module.exports = {
  startInactividad,
  resetInactividad,
  stopInactividad,
  flowInactividad,
};
