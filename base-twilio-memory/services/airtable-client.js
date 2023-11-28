const axios = require('axios');

//axios request
const airtable = async (method, url, body) => {
  const config = {
    method: method,
    url: url,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Bearer patbAqdmJO0ntHHYL.e784ce069516df6c8f7cbcda8279ed0ca28cae0d4f1b1f0a3320c6d7529e0f14',
    },
  };

  body && (config['data'] = body);

  try {
    const response = await axios.request(config);
    const text = response.data;
    return text;
  } catch (err) {
    throw err;
  }
};

//Buscar listado de usuarios
async function airtableGet(table) {
  const result = await airtable(
    'GET',
    `https://api.airtable.com/v0/appbSfEIG0OB8UdVa/${table}`
  );

  return result;
}

async function airtableGetOne(table, id) {
  const result = await airtable(
    'GET',
    `https://api.airtable.com/v0/appbSfEIG0OB8UdVa/${table}?filterByFormula={id}=${id}`
  );

  return result;
}

async function airtablePost(table, data) {
  const result = await airtable(
    'POST',
    `https://api.airtable.com/v0/appbSfEIG0OB8UdVa/${table}`,
    data
  );

  return result;
}

async function airtableAnswers(table,myState,ctx) {
  var id = ctx.from ? ctx.from : '0';
  var motivo = myState.motivo ? myState.motivo : '0';
  var cotizar = myState.cotizar ? myState.cotizar : '0';
  var ciudad = myState.ciudad ? myState.ciudad : '0';
  var catalogo = myState.catalogo ? myState.catalogo : '0';
  var sucursal = myState.sucursal ? myState.sucursal : '0';
  var queja = myState.queja ? myState.queja : '0';

  var data = JSON.stringify({
        
  fields: {
        id: `${id}`,
        motivo: `${motivo}`,
        cotizar: `${cotizar}`,
        ciudad: `${ciudad}`,
        catalogo: `${catalogo}`,
        sucursal: `${sucursal}`,
        queja: `${queja}`,
    },
    });
    console.log(data)

  const result = await airtable(
    'POST',
    `https://api.airtable.com/v0/appbSfEIG0OB8UdVa/${table}`,
    data
  );

  return result;
}

module.exports = { airtableGet, airtableGetOne, airtablePost,airtableAnswers };
