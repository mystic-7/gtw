//Importaciones
const {
  flowPrincipal,
  flowOpciones,
  flowReclamosSugerencias,
  flowRegistro,
  flowDespedida,
} = require('./flows/main-flows');
const {
  flowInactividad,
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require('./tools/idleCasero');

const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const { flowTiendas, flowSucursales } = require('./flows/tiendas');
const { flowPuente } = require('./flows/puente');
const { flowCatalogo } = require('./flows/catalogos');

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
    flowDespedida,
    flowPuente,
    flowInactividad,
  ]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: 'ACd9e32ec40f49a8c4d98094d7c9db205f',
    authToken: 'c9dccdf4563cc3f6a3ad025c377db6fb',
    vendorNumber: '+584122650987',
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
