require('dotenv').config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendMessage(numbers, mensaje) {
  console.log(numbers);
  try {
    numbers.forEach(async (number) => {
      await client.messages.create({
        to: `whatsapp:${number}`,
        from: `whatsapp:+584122650987`,
        body: `${mensaje}`,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendMessage,
};
