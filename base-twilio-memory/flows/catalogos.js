//Importaciones
const { addKeyword } = require('@bot-whatsapp/bot');
const { airtableGet, airtableAnswers } = require('../services/airtable-client');
const { createSortedList, getFlow, getFields } = require('../tools/utils');
const { flowTiendas } = require('./tiendas');
const { flowPuente } = require('./puente');
const { resetInactividad, stopInactividad } = require('../tools/idleCasero');

//Flows
const flowCatalogo = addKeyword(['LISTA_DE_CATALOGOS'], {
  sensitive: true,
})
  .addAction(async (_, { flowDynamic }) => {
    const catalogos = await airtableGet('catalogos');
    const list = createSortedList(getFields(catalogos));

    const flows = await airtableGet('flows');
    const helperText = getFlow(getFields(flows), 'catalogos').texto;

    const mensaje = helperText + '\n\n' + list.join('\r\n');
    return await flowDynamic(mensaje);
  })
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction(
    { capture: true },
    async (ctx, { state, flowDynamic, fallBack }) => {
      catalogo_s = parseInt(ctx.body);
      const l_catalogos = await airtableGet('catalogos');
      const list = getFields(l_catalogos).filter((r) => r.id == catalogo_s);
      const flows = await airtableGet('flows');
      const disculpa = getFlow(getFields(flows), 'fallback');
      if (list.length > 0) {
        stopInactividad(ctx);
        await state.update({ catalogo: list[0].nombre });
        await flowDynamic([
          {
            body: list[0].nombre,
            media: list[0].info,
          },
        ]);
        const flows = await airtableGet('flows');
        const mensaje = getFlow(getFields(flows), 'cotizar').texto;
        await flowDynamic([
          {
            body: mensaje,
            delay: 4000,
          },
        ]);
      } else {
        await flowDynamic(disculpa.texto);
        return fallBack();
      }
    }
  )
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, fallBack, state, gotoFlow }) => {
      resetInactividad(ctx, gotoFlow);
      const flows = await airtableGet('flows');
      const disculpa = getFlow(getFields(flows), 'fallback');
      if (ctx.body === '1' || ctx.body.toLowerCase() === 'si') {
        stopInactividad(ctx);
        await state.update({ cotizar: true });
        return gotoFlow(flowTiendas);
      } else if (ctx.body === '2' || ctx.body.toLowerCase() === 'no') {
        stopInactividad(ctx);
        await state.update({ cotizar: false });
        const myState = state.getMyState();
        airtableAnswers('conversaciones', myState, ctx);
        return gotoFlow(flowPuente);
      } else {
        await flowDynamic(disculpa.texto);
        return fallBack();
      }
    }
  );

module.exports = {
  flowCatalogo,
};
