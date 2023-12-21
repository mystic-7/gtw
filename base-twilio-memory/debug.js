//Importaciones

const { airtableGet } = require('./services/airtable-client');

const { getFlow, getFields } = require('./tools/utils');
const { sendMessage } = require('./message');

async function bug() {
  const gerentes = await airtableGet('gerentes');
  const atc = getFlow(getFields(gerentes), 1);
  console.log(atc);
}

bug();
