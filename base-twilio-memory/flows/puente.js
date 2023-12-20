const { addKeyword } = require('@bot-whatsapp/bot');

const flowPuente = addKeyword(['PUENTE']).addAction(async (_, { gotoFlow }) => {
  const { flowAyuda } = require('./main-flows');
  return gotoFlow(flowAyuda);
});

module.exports = { flowPuente };
