const { addKeyword } = require('@bot-whatsapp/bot');
const { airtableGet,airtableAnswers } = require('../services/airtable-client');
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
    .addAction({ capture: true }, async (ctx, { gotoFlow,state, flowDynamic,fallBack }) => {
        catalogo_s = parseInt(ctx.body);
        await state.update({ catalogo: ctx.body });
        const l_catalogos = await airtableGet('catalogos');
        const list = getFields(l_catalogos).filter((r) => r.id == catalogo_s);
        const flows = await airtableGet('flows');
        const disculpa = getFlow(getFields(flows), 'fallback');
        console.log(list[0].info)
        if (list.length > 0) {
            await flowDynamic([{
              body:list[0].nombre,
              media: list[0].info
            }])
            const flows = await airtableGet('flows');
            const mensaje = getFlow(getFields(flows), 'cotizar').texto;
            await flowDynamic([{
              body: mensaje,
              delay:8000
            }]);
        } else {
            await flowDynamic(disculpa.texto);
            return fallBack();
        }
    })
    .addAction({ capture: true }, async (ctx, { gotoFlow,flowDynamic,fallBack,state }) => {
      if (ctx.body === '1') {
        await state.update({ cotizar: ctx.body });
        return gotoFlow(flowTiendas)
      } else if (ctx.body === '2') {
        await state.update({ cotizar: ctx.body });
        const myState = state.getMyState();
        airtableAnswers('test',myState,ctx)
        const flows = await airtableGet('flows');
        const mensaje = getFlow(getFields(flows), 'despedida').texto;
        return await flowDynamic(mensaje);
      } else {
        return fallBack()
      }
    });

module.exports = {
        flowCatalogo,
      };