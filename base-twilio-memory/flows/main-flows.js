//Importaciones
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const { greetingsPool } = require('../tools/greetings');
const { flowTiendas } = require('./tiendas');
const { flowCatalogo } = require('./catalogos');
const { resetInactividad, stopInactividad } = require('../tools/idle-casero');

const {
  airtableGet,
  airtablePost,
  airtableAnswers,
} = require('../services/airtable-client');

const {
  filterRecordsById,
  getFlow,
  getFields,
  sleep,
  generateAlert,
} = require('../tools/utils');
const { sendMessage } = require('../message');

//Flows
const flowDespedida = addKeyword(['SAYO_NARA'], {
  sensitive: true,
}).addAction(async (ctx, { flowDynamic, state }) => {
  const myState = state.getMyState();
  airtableAnswers('conversaciones', myState, ctx);

  const flows = await airtableGet('flows');
  const texto = getFlow(getFields(flows), 'despedida').texto;
  const partes = texto.split(/\n\n/);
  return await flowDynamic(partes);
});

const flowSatisfaccion = addKeyword(['SATIS_FAXION'], {
  sensitive: true,
})
  .addAction(async (_, { flowDynamic }) => {
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'satisfaccion').texto;
    return await flowDynamic(mensaje);
  })
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      if (ctx.body === '1' || ctx.body.toLowerCase() === 'si') {
        await state.update({ satisfaccion: true });
        stopInactividad(ctx);
        return gotoFlow(flowDespedida);
      } else if (ctx.body === '2' || ctx.body.toLowerCase() === 'no') {
        stopInactividad(ctx);
        return gotoFlow(flowDespedida);
      } else {
        const flows = await airtableGet('flows');
        const disculpa = getFlow(getFields(flows), 'fallback');
        await flowDynamic(disculpa);
        return fallBack();
      }
    }
  );

const flowAyuda = addKeyword(['HALP'], {
  sensitive: true,
})
  .addAction(async (_, { flowDynamic }) => {
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'ayuda_adicional').texto;
    return await flowDynamic(mensaje);
  })
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      if (
        ctx.body === '1' ||
        ctx.body.toLowerCase() === 'si' ||
        ctx.body === '✅'
      ) {
        stopInactividad(ctx);
        await state.update({ satisfaccion: true });
        const myState = state.getMyState();
        airtableAnswers('conversaciones', myState, ctx);
        await flowDynamic('Seguro!');
        return gotoFlow(flowOpciones);
      } else if (
        ctx.body === '2' ||
        ctx.body.toLowerCase() === 'no' ||
        ctx.body === '❌'
      ) {
        stopInactividad(ctx);
        return gotoFlow(flowSatisfaccion);
      } else {
        const flows = await airtableGet('flows');
        const disculpa = getFlow(getFields(flows), 'fallback');
        await flowDynamic(disculpa);
        return fallBack();
      }
    }
  );

const flowOpciones = addKeyword(['LISTA_DE_OPCIONES'], {
  sensitive: true,
})
  .addAction(async (_, { flowDynamic }) => {
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'opciones').texto;
    return await flowDynamic(mensaje);
  })
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      if (
        ctx.body === '1' ||
        ctx.body === '2' ||
        ctx.body === '3' ||
        ctx.body === '4' ||
        ctx.body === '5' ||
        ctx.body === '6'
      ) {
        const opcion = parseInt(ctx.body);
        switch (opcion) {
          case 1:
            stopInactividad(ctx);
            await state.update({ motivo: 'Horarios y Ubicaciones' });
            return gotoFlow(flowTiendas);
          case 2:
            stopInactividad(ctx);
            await state.update({ motivo: 'Catalogos' });
            return gotoFlow(flowCatalogo);
          case 3:
            stopInactividad(ctx);
            await state.update({ motivo: 'Cotizar productos' });
            return gotoFlow(flowTiendas);
          case 4:
            stopInactividad(ctx);
            await state.update({ motivo: 'Promociones' });
            return gotoFlow(flowTiendas);
          case 5:
            stopInactividad(ctx);
            await state.update({ motivo: 'Disponibilidad' });
            return gotoFlow(flowTiendas);
          case 6:
            stopInactividad(ctx);
            await state.update({ motivo: 'Reclamos' });
            return gotoFlow(flowReclamosSugerencias);
        }
      } else {
        const flows = await airtableGet('flows');
        const disculpa = getFlow(getFields(flows), 'fallback');
        await flowDynamic(disculpa);
        return gotoFlow(flowOpciones);
      }
    }
  );

const flowReclamosSugerencias = addKeyword(['RECLAMOS_SUGERENCIAS'])
  .addAction(async (_, { flowDynamic }) => {
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'pregunta_reclamos').texto;
    return await flowDynamic(mensaje);
  })
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic, state }) => {
      await state.update({ queja: ctx.body });
      queja = ctx.body;
      const horaActual = new Date().getHours() - 4;
      if (horaActual >= 7 && horaActual < 17) {
        stopInactividad(ctx);

        const flows = await airtableGet('flows');
        const mensaje = getFlow(getFields(flows), 'horario');
        await flowDynamic(mensaje.texto);

        const myState = state.getMyState();
        const motivacion = myState.motivo ? myState.motivo : '';
        const listaDeContactos = await airtableGet('clientes');
        const nombreDeContacto = filterRecordsById(
          listaDeContactos,
          ctx.from,
          true
        );
        const alerta = generateAlert(
          nombreDeContacto,
          motivacion,
          null,
          ctx.from,
          queja
        );
        const gerentes = await airtableGet('gerentes');
        const atc = getFlow(getFields(gerentes), 1).telefono;
        const numero = [atc];
        sendMessage(numero, alerta);

        return gotoFlow(flowAyuda);
      } else if (horaActual >= 17) {
        stopInactividad(ctx);
        const flows = await airtableGet('flows');
        const mensaje = getFlow(getFields(flows), 'nhorario');
        await flowDynamic(mensaje.texto);
        return gotoFlow(flowAyuda);
      } else {
        return fallBack();
      }
    }
  );

const flowRegistro = addKeyword('USUARIOS_NO_REGISTRADOS')
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction(async (_, { flowDynamic }) => {
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'registro').texto;
    return await flowDynamic(mensaje);
  })
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction({ capture: true }, async (ctx, { state, flowDynamic }) => {
    await state.update({ nombre: ctx.body });
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'correo').texto;
    await flowDynamic(mensaje);
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      stopInactividad(ctx);
      if (ctx.body.includes('@')) {
        await state.update({ correo: ctx.body });
      } else {
        await state.update({ correo: ' ' });
      }
      const myState = state.getMyState();
      var raw = JSON.stringify({
        fields: {
          nombre: `${myState.nombre}`,
          telefono: `${ctx.from}`,
          correo: `${myState.correo}`,
        },
      });
      const flows = await airtableGet('flows');
      const mensaje = getFlow(getFields(flows), 'gracias').texto;
      await flowDynamic(mensaje);
      await airtablePost('clientes', raw);
      sleep(5000);
      const listaDeContactos = await airtableGet('clientes');
      const nombreDeContacto = filterRecordsById(
        listaDeContactos,
        ctx.from,
        true
      );
      let salu2 = `Listo! ${nombreDeContacto}, gracias por esperarme 😄! Ahora sí, dime como puedo ayudarte`;
      await flowDynamic(salu2);
      return gotoFlow(flowOpciones);
    }
  );

const flowPrincipal = addKeyword(EVENTS.WELCOME).addAction(
  async (ctx, { gotoFlow, flowDynamic, state }) => {
    const listaDeContactos = await airtableGet('clientes');
    const nombreDeContacto = filterRecordsById(
      listaDeContactos,
      ctx.from,
      true
    );
    if (nombreDeContacto) {
      let saludo = greetingsPool(nombreDeContacto);
      await flowDynamic(saludo);
      state.clear();
      return gotoFlow(flowOpciones);
    } else {
      return gotoFlow(flowRegistro);
    }
  }
);

module.exports = {
  flowPrincipal,
  addKeyword,
  flowOpciones,
  flowReclamosSugerencias,
  flowRegistro,
  flowAyuda,
  flowSatisfaccion,
  flowDespedida,
};
