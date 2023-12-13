const { addKeyword } = require('@bot-whatsapp/bot');

const flowPuente = addKeyword(['PUENTE']).addAction(async (_, { gotoFlow }) => {
  const { flowDespedida } = require('./main-flows');
  return gotoFlow(flowDespedida);
});

module.exports = { flowPuente };
