const { addKeyword } = require('@bot-whatsapp/bot');
const { airtableGet, airtableAnswers } = require('../services/airtable-client');
const { createSortedList, getFlow, getFields,filterRecordsById } = require('../tools/utils');
let city;

const flowSucursales = addKeyword(['LISTA_DE_TIENDAS'], {
  sensitive: true,
}).addAction(
  { capture: true },
  async (ctx, { flowDynamic, fallBack, state }) => {
    let store = parseInt(ctx.body);
    const sucursales = await airtableGet('sucursales');
    const tienda = getFlow(getFields(sucursales), store);
    console.log(tienda)
    console.log(getFields(sucursales))
    const flows = await airtableGet('flows');
    const disculpa = getFlow(getFields(flows), 'fallback');
    console.log(tienda)
    if (tienda === undefined){
      await flowDynamic(disculpa.texto);
      return fallBack();
    } else if (tienda.id_ciudad[0] === city) {
      await state.update({ sucursal: tienda.nombre });
      const myState = state.getMyState();
      airtableAnswers('conversaciones', myState, ctx);
      var linkws = tienda.whalink ? tienda.whalink : ''
      var motivacion = myState.motivo ? myState.motivo : ''
      const listaDeContactos = await airtableGet('clientes');
      const nombreDeContacto = filterRecordsById(listaDeContactos, ctx.from,true);
      const correoDeContacto = filterRecordsById(listaDeContactos, ctx.from,false);
      return await flowDynamic(tienda.direccion + '' + motivacion.toLowerCase() + '.\n' + '\n' + (linkws === '' ? '' : (linkws + `&text=Hola%20soy%20${nombreDeContacto.replace(/\s/g, '%20')},` + (correoDeContacto === undefined ? '' : ('%20mi%20correo%20es%20' + correoDeContacto + '%20y')) + `%20quisiera%20saber%20informaci%C3%B3n%20sobre%20${motivacion.replace(/\s/g, '%20')}`))); 
    } else {
      await flowDynamic(disculpa.texto);
      return fallBack();
    }
  }
);

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
  .addAction(
    { capture: true },
    async (ctx, { state, gotoFlow, flowDynamic, fallBack }) => {
      city = parseInt(ctx.body);
      const ciudades = await airtableGet('ciudades');
      const ciudad = getFlow(getFields(ciudades), city);

      if (isNaN(city)) {
        const flows = await airtableGet('flows');
        const disculpa = getFlow(getFields(flows), 'fallback');
        await flowDynamic(disculpa.texto);
        return fallBack();
      } else if (ciudad.sucursales.length > 1 && !isNaN(city)) {
        await state.update({ ciudad: ciudad.nombre });
        const sucursales = await airtableGet('sucursales');
        const list = createSortedList(
          getFields(sucursales).filter((r) => r.id_ciudad.includes(city))
        );
        const flows = await airtableGet('flows');
        const helperText = getFlow(getFields(flows), 'sucursales').texto;

        await flowDynamic([helperText, list.join('\r\n')]);
        return gotoFlow(flowSucursales);
      } else if (!isNaN(city)) {
        await state.update({ ciudad: ciudad.nombre });
        await state.update({ sucursal: ciudad.nombre_sucursales[0] });
        const myState = state.getMyState();
        airtableAnswers('conversaciones', myState, ctx);
        var linkws = ciudad.whalink ? ciudad.whalink : ''
        var motivacion = myState.motivo ? myState.motivo : ''
        const listaDeContactos = await airtableGet('clientes');
        const nombreDeContacto = filterRecordsById(listaDeContactos, ctx.from,true);
        const correoDeContacto = filterRecordsById(listaDeContactos, ctx.from,false);
        return await flowDynamic(ciudad.direccion[0] + ' ' + motivacion.toLowerCase() + '.\n' + '\n' + (linkws === '' ? '' : (linkws + `&text=Hola%20soy%20${nombreDeContacto.replace(/\s/g, '%20')},` + (correoDeContacto === undefined ? '' : ('%20mi%20correo%20es%20' + correoDeContacto + '%20y')) + `%20quisiera%20saber%20informaci%C3%B3n%20sobre%20${motivacion.replace(/\s/g, '%20')}`)));
         
      }
    }
  );

module.exports = {
  flowTiendas,
  flowSucursales,
};
