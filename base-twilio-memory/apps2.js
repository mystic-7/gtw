const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const TwilioProvider = require("@bot-whatsapp/provider/twilio");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { EVENTS } = require("@bot-whatsapp/bot");
const {airtableGet } = require("./http-service");
const {filterById } = require("./utils.js");
const {flowOpciones,flowRegistro,flowgracias} = require('./other_modules.js')
const delays = 4000;
const delays_f = 1500;

const flowPrincipal = addKeyword("hola").addAnswer(
  "¡Gracias por contactar a *Prosein*! 🙌🏼.",
  null,
  async (ctx, { gotoFlow, flowDynamic }) => {
    const response = await airtableGet();
    const nombre = filterById(response, ctx.WaId);
    if (nombre) {
      await flowDynamic(`Hola ${nombre} un placer verte denuevo!`);
      return gotoFlow(flowOpciones);
    } else {
      return gotoFlow(flowRegistro);
    }
  }
);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowPrincipal,
    flowgracias,
    flowOpciones,
    flowRegistro,
  ]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: "AC520009ca0a7a922be37ef85be3670a16",
    authToken: "cb9e75ddc49a4cf3cb4966c0161e7211",
    vendorNumber: "+14155238886",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
