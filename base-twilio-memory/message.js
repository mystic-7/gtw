require('dotenv').config();

async function sendMessage(numbers,mensaje) {
    try {
        console.log(process.env.ACCOUNTSID)
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


// const { airtableGet, airtableAnswers } = require('./services/airtable-client');
// const {
//     createSortedList,
//     getFlow,
//     getFields,
//     filterRecordsById,
//     generateStoreResponse,
//   } = require('./tools/utils');


// async function prueba(context, event, callback) {
//     const sucursales = await airtableGet('sucursales');
//     const tienda = getFlow(getFields(sucursales), 1);
//     console.log(tienda.telefonos_gerentes[0])
// }

// prueba()