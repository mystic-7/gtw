const { addKeyword } = require('@bot-whatsapp/bot');
const { airtableGet, airtableAnswers } = require('../services/airtable-client');
const { flowPuente } = require('./puente');
const {sendMessage} = require('../message')
const {
  createSortedList,
  getFlow,
  getFields,
  filterRecordsById,
  generateStoreResponse,
  generateAlert,
} = require('../tools/utils');
const {
  flowInactividad,
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require('../tools/idleCasero');

let city;

const flowSucursales = addKeyword(['LISTA_DE_TIENDAS'], {
  sensitive: true,
})
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
  })
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic, fallBack, state }) => {
      let store = parseInt(ctx.body);
      const sucursales = await airtableGet('sucursales');
      const tienda = getFlow(getFields(sucursales), store);
      const flows = await airtableGet('flows');
      const disculpa = getFlow(getFields(flows), 'fallback');
      if (!tienda) {
        await flowDynamic(disculpa.texto);
        return fallBack();
      } else if (tienda.id_ciudad[0] === city) {
        stopInactividad(ctx);
        await state.update({ sucursal: tienda.nombre });
        const myState = state.getMyState();
        airtableAnswers('conversaciones', myState, ctx);
        var linkws = tienda.whalink ? tienda.whalink : '';
        var motivacion = myState.motivo ? myState.motivo : '';
        const listaDeContactos = await airtableGet('clientes');
        const nombreDeContacto = filterRecordsById(
          listaDeContactos,
          ctx.from,
          true
        );
        const correoDeContacto = filterRecordsById(
          listaDeContactos,
          ctx.from,
          false
        );
        const mensaje = generateStoreResponse(
          linkws,
          nombreDeContacto,
          correoDeContacto,
          motivacion,
          tienda.direccion
        );

        if (motivacion != 'Horarios y Ubicaciones'){
          let alerta = generateAlert(nombreDeContacto,motivacion,tienda.nombre,ctx.from)
          sendMessage(tienda.telefonos_gerentes,alerta)
        }

        
        await flowDynamic(mensaje);
        return gotoFlow(flowPuente);
      } else {
        await flowDynamic(disculpa.texto);
        return fallBack();
      }
    }
  );

const flowTiendas = addKeyword(['LISTA_DE_CIUDADES'], {
  sensitive: true,
})
  .addAction(async (ctx, { gotoFlow }) => {
    resetInactividad(ctx, gotoFlow);
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
    { capture: true, idle: 2000 },
    async (ctx, { state, gotoFlow, flowDynamic, fallBack }) => {
      city = parseInt(ctx.body);
      const ciudades = await airtableGet('ciudades');
      const ciudad = getFlow(getFields(ciudades), city);
      if (isNaN(city) || ciudad === undefined) {
        const flows = await airtableGet('flows');
        const disculpa = getFlow(getFields(flows), 'fallback');
        await flowDynamic(disculpa.texto);
        return fallBack();
      }

      if (ciudad.sucursales.length > 1) {
        stopInactividad(ctx);
        await state.update({ ciudad: ciudad.nombre });
        const sucursales = await airtableGet('sucursales');
        const list = createSortedList(
          getFields(sucursales).filter((r) => r.id_ciudad.includes(city))
        );
        const flows = await airtableGet('flows');
        const helperText = getFlow(getFields(flows), 'sucursales').texto;

        await flowDynamic([helperText, list.join('\r\n')]);
        return gotoFlow(flowSucursales);
      } else {
        stopInactividad(ctx);
        await state.update({ ciudad: ciudad.nombre });
        await state.update({ sucursal: ciudad.nombre_sucursales[0] });
        const myState = state.getMyState();
        airtableAnswers('conversaciones', myState, ctx);
        var linkws = ciudad.whalink ? ciudad.whalink : '';
        var motivacion = myState.motivo ? myState.motivo : '';
        const listaDeContactos = await airtableGet('clientes');
        const nombreDeContacto = filterRecordsById(
          listaDeContactos,
          ctx.from,
          true
        );
        const correoDeContacto = filterRecordsById(
          listaDeContactos,
          ctx.from,
          false
        );
        const mensaje = generateStoreResponse(
          linkws,
          nombreDeContacto,
          correoDeContacto,
          motivacion,
          ciudad.direccion[0]
        );
        await flowDynamic(mensaje);
        return gotoFlow(flowPuente);
      }
    }
  );

module.exports = {
  flowTiendas,
  flowSucursales,
};
