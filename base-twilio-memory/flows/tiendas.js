const { addKeyword } = require('@bot-whatsapp/bot');
const { airtableGet } = require('../services/airtable-client');
const { createSortedList, getFlow, getFields } = require('../tools/utils');

let city;

const flowSucursales = addKeyword(['LISTA_DE_TIENDAS'], {
  sensitive: true,
}).addAction({ capture: true }, async (ctx, { flowDynamic, fallBack }) => {
  let store = parseInt(ctx.body);
  const sucursales = await airtableGet('sucursales');
  const tienda = getFlow(getFields(sucursales), store);

  const flows = await airtableGet('flows');
  const disculpa = getFlow(getFields(flows), 'fallback');

  console.log(city, tienda, disculpa);

  if (tienda.id_ciudad[0] === city) {
    return await flowDynamic(tienda.direccion);
  } else {
    await flowDynamic(disculpa.texto);
    return fallBack;
  }
});

const flowTiendas = addKeyword(['LISTA_DE_CIUDADES'], {
  sensitive: true,
})
  .addAction(async (_, { flowDynamic }) => {
    const ciudades = await airtableGet('ciudades');
    const list = createSortedList(getFields(ciudades));

    const flows = await airtableGet('flows');
    const helperText = getFlow(getFields(flows), 'ciudades').texto;

    const mensaje = helperText + '\n\n' + list.join('\r\n');
    return await flowDynamic(mensaje);
  })
  .addAction({ capture: true }, async (ctx, { gotoFlow, flowDynamic }) => {
    city = parseInt(ctx.body);
    const ciudades = await airtableGet('ciudades');
    const ciudad = getFlow(getFields(ciudades), city);

    if (ciudad.sucursales.length > 1) {
      const sucursales = await airtableGet('sucursales');
      const list = createSortedList(
        getFields(sucursales).filter((r) => r.id_ciudad.includes(city))
      );

      const flows = await airtableGet('flows');
      const helperText = getFlow(getFields(flows), 'sucursales').texto;

      await flowDynamic([helperText, list.join('\r\n')]);
      return gotoFlow(flowSucursales);
    } else {
      return await flowDynamic(ciudad.direccion[0]);
    }
  });

module.exports = {
  flowTiendas,
  flowSucursales,
};
