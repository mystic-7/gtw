const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const {
  flowPrincipal,
  flowOpciones,
  flowReclamosSugerencias,
  flowRegistro,
  flowDespedida,
} = require('./flows/main-flows');
const { flowTiendas, flowSucursales } = require('./flows/tiendas');
const { flowCatalogo } = require('./flows/catalogos');

const TwilioProvider = require('@bot-whatsapp/provider/twilio');
const MockAdapter = require('@bot-whatsapp/database/mock');

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
  ]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: 'ACd9e32ec40f49a8c4d98094d7c9db205f',
    authToken: '393060b6fe57e3940d5a4a7517ef31eb',
    vendorNumber: '+584122650987',
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
