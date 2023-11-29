const { addKeyword } = require('@bot-whatsapp/bot');
const { airtableGet, airtableAnswers } = require('../services/airtable-client');
const { createSortedList, getFlow, getFields } = require('../tools/utils');
const { flowTiendas } = require('./tiendas');

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
  .addAction(
    { capture: true },
    async (ctx, { state, flowDynamic, fallBack }) => {
      catalogo_s = parseInt(ctx.body);
      const l_catalogos = await airtableGet('catalogos');
      const list = getFields(l_catalogos).filter((r) => r.id == catalogo_s);
      const flows = await airtableGet('flows');
      const disculpa = getFlow(getFields(flows), 'fallback');
      if (list.length > 0) {
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
    async (ctx, { flowDynamic, fallBack, state }) => {
      if (ctx.body === '1') {
        await state.update({ cotizar: 'Si' });
        return gotoFlow(flowTiendas);
      } else if (ctx.body === '2') {
        await state.update({ cotizar: 'No' });
        const myState = state.getMyState();
        airtableAnswers('conversaciones', myState, ctx);
        const flows = await airtableGet('flows');
        const texto = getFlow(getFields(flows), 'despedida').texto;
        const partes = texto.split(/\n\n/);
        return await flowDynamic(partes);
      } else {
        return fallBack();
      }
    }
  );

module.exports = {
  flowCatalogo,
};
