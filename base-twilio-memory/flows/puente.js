const { addKeyword } = require('@bot-whatsapp/bot');

const flowPuente = addKeyword(['PUENTE']).addAction(async (_, { gotoFlow }) => {
  console.log('Entré en flow puente');
  const { flowDespedida } = require('./main-flows');
  return gotoFlow(flowDespedida);
});

module.exports = { flowPuente };
