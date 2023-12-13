require('dotenv').config();

async function sendMessage(numbers,mensaje) {
    try {
        const accountSid = process.env.ACCOUNTSID;
        const authToken = process.env.AUTHTOKEN;
        const client = require('twilio')(accountSid, authToken);;

        numbers.forEach(async number => {
            const message = await client.messages.create({
                'to': `whatsapp:${number}`,
                'from': `whatsapp:+584122650987`,
                'body': `${mensaje}`
            });

        });
    }
    catch (error){
        console.log(error)
    }
};

module.exports= {
    sendMessage
};

