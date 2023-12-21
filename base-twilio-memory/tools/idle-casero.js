//Importaciones
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const { airtableGet } = require('../services/airtable-client');
const { getFlow, getFields } = require('./utils');

// Objeto para almacenar temporizadores por usuario
const timers = {};
const time = 60000;

//Flows
const flowInactividad = addKeyword(EVENTS.ACTION).addAction(
  async (_, { endFlow, state }) => {
    await state.update({ incompleto: true });
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'sesion_cerrada').texto;
    const myState = state.getMyState();
    airtableAnswers('conversaciones', myState, ctx);
    return endFlow(mensaje);
  }
);

// Función para iniciar el temporizador
function startInactividad(ctx, gotoFlow) {
  timers[ctx.from] = setTimeout(() => {
    return gotoFlow(flowInactividad);
  }, time);
}

// Función para reiniciar el temporizador
function resetInactividad(ctx, gotoFlow) {
  stopInactividad(ctx);
  if (timers[ctx.from]) {
    clearTimeout(timers[ctx.from]);
  }

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
