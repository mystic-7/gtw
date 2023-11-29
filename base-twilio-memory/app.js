const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const {
  flowPrincipal,
  flowOpciones,
  flowReclamosSugerencias,
  flowRegistro,
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
  ]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: 'AC520009ca0a7a922be37ef85be3670a16',
    authToken: 'cb9e75ddc49a4cf3cb4966c0161e7211',
    vendorNumber: '+14155238886',
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
