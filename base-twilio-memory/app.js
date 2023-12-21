//Importaciones
require('dotenv').config();

const { flowInactividad } = require('./tools/idle-casero');
const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const { flowTiendas, flowSucursales } = require('./flows/tiendas');
const { flowPuente } = require('./flows/puente');
const { flowCatalogo } = require('./flows/catalogos');

const {
  flowPrincipal,
  flowOpciones,
  flowReclamosSugerencias,
  flowRegistro,
  flowAyuda,
  flowSatisfaccion,
  flowDespedida,
} = require('./flows/main-flows');

const TwilioProvider = require('@bot-whatsapp/provider/twilio');
const MockAdapter = require('@bot-whatsapp/database/mock');

//Main
const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowPrincipal,
    flowReclamosSugerencias,
    flowOpciones,
    flowTiendas,
    flowSucursales,
    flowCatalogo,
    flowRegistro,
    flowAyuda,
    flowSatisfaccion,
    flowDespedida,
    flowPuente,
    flowInactividad,
  ]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: process.env.ACCOUNTSID,
    authToken: process.env.AUTHTOKEN,
    vendorNumber: process.env.WHATSAPP_NUMBER,
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
