require('dotenv').config({path: '../'});
const accountSid = 'ACd9e32ec40f49a8c4d98094d7c9db205f';
const authToken = 'c9dccdf4563cc3f6a3ad025c377db6fb';
const client = require('twilio')(accountSid, authToken);

async function createconv(context, event, callback) {
  const numbers = ['+584122650987', '+584241604932','+584247182145']
  const client = context;
  console.log(client)
  const conversation = await client.conversations.v1.conversations.create();
  console.log(conversation)
  console.log('entrando a for')
  numbers.forEach(async (number) => {
    console.log('entro a for')
    const newParticipant = await client.conversations.v1.conversations(conversation.sid).participants.create({
      'messagingBinding.address': `whatsapp:${number}`,
      'messagingBinding.proxyAddress': `whatsapp:${process.env.WHATSAPP_NUMBER}`
    });
    console.log('newParticipant')
    console.log(newParticipant)
    const message = await client.messages.create({
      'to': `whatsapp:${number}`,
      'from': `whatsapp:${process.env.WHATSAPP_NUMBER}`,
      'body': ' Elisa te ha invitado a un grupo. Confirma tu invitación en el siguiente boton*'
    });
    console.log('message')
    console.log(message)
  });
  console.log(conversation.sid)

  return callback(null, conversation.sid);
};

createconv(client)