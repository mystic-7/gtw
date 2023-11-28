const { addKeyword } = require('@bot-whatsapp/bot');
const { airtableGet,airtablePost,airtableAnswers } = require('../services/airtable-client');
const { filterRecordsById, getFlow, getFields } = require('../tools/utils');
const { greetingsPool } = require('../tools/greetings');
const { flowTiendas } = require('./tiendas');
const { flowCatalogo } = require('./catalogos');

const flowOpciones = addKeyword(['LISTA_DE_OPCIONES'], {
  sensitive: true,
})
  .addAction(async (_, { flowDynamic }) => {
    const flows = await airtableGet('flows');
    const mensaje = getFlow(getFields(flows), 'opciones').texto;
    return await flowDynamic(mensaje);
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
        await state.update({ motivo: ctx.body });
        const opcion = parseInt(ctx.body);
        await state.update({ motivo: ctx.body });
        switch (opcion) {
          case 1:
            return gotoFlow(flowTiendas);
          case 2:
            return gotoFlow(flowCatalogo);
          case 3:
            return gotoFlow(flowTiendas);
          case 4:
            return gotoFlow(flowTiendas);
          case 5:
            return gotoFlow(flowTiendas);
          case 6:
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

const flowReclamosSugerencias = addKeyword(['RECLAMOS_SUGERENCIAS']).addAction(async (_, { flowDynamic }) => {
  const flows = await airtableGet('flows');
  const mensaje = getFlow(getFields(flows), 'pregunta_reclamos').texto;
  return await flowDynamic(mensaje);
}).addAction({ capture: true }, async (ctx, { gotoFlow, flowDynamic,state }) => {
      const myState = state.getMyState();
      airtableAnswers('test',myState,ctx);
      queja = ctx.body;
      const horaActual = new Date().getHours();
      if (horaActual >= 7 && horaActual < 17) {
        const flows = await airtableGet('flows');
        const mensaje = getFlow(getFields(flows), 'horario');
        await flowDynamic(mensaje.texto);
      } else if (horaActual >= 17) {
        const flows = await airtableGet('flows');
        const mensaje = getFlow(getFields(flows), 'nhorario');
        await flowDynamic(mensaje.texto);
      } else {
        return fallBack();
      }
    }
)


const flowRegistro = addKeyword('USUARIOS_NO_REGISTRADOS').addAction(async (_, { flowDynamic }) => {
  const flows = await airtableGet('flows');
  const mensaje = getFlow(getFields(flows), 'registro').texto;
  return await flowDynamic(mensaje);
}).addAction({ capture: true }, async (ctx, { state,flowDynamic }) => {
  await state.update({ nombre: ctx.body });
  const flows = await airtableGet('flows');
  const mensaje = getFlow(getFields(flows), 'correo').texto;
  await flowDynamic(mensaje);
}).addAction({ capture: true }, async (ctx,{ flowDynamic, gotoFlow, state }) => {
  if (ctx.body.includes('@')) {
        await state.update({ correo: ctx.body });
  } else {
    await state.update({ correo: " " });
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
  airtablePost('clientes',raw)
  return gotoFlow(flowOpciones)
  
})



const flowPrincipal = addKeyword(['hola', 'ole', 'alo']).addAction(
  async (ctx, { gotoFlow, flowDynamic }) => {
    try {
      const listaDeContactos = await airtableGet('clientes');
      const nombreDeContacto = filterRecordsById(listaDeContactos, ctx.from);
      if (nombreDeContacto) {
        let saludo = greetingsPool(nombreDeContacto);
        await flowDynamic(saludo);
        return gotoFlow(flowOpciones);
      } else {
        return gotoFlow(flowRegistro);
      }
    } catch (error) {
      console.error('Error in flowPrincipal:', error);
    }
  }
);

module.exports = { flowPrincipal, addKeyword, flowOpciones,flowReclamosSugerencias,flowRegistro };
