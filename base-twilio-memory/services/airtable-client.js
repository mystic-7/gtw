const axios = require('axios');
const { getRecordId } = require('../tools/utils');

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
    console.log(err);
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

async function airtableAnswers(table, myState, ctx) {
  let cliente = await airtableGetOne('clientes', ctx.from);

  let data = {
    fields: {
      ...(cliente.records.length > 0 && { clientes: [getRecordId(cliente)] }),
      ...myState,
    },
    typecast: true,
  };

  delete data.fields.nombre;
  delete data.fields.correo;

  const result = await airtable(
    'POST',
    `https://api.airtable.com/v0/appbSfEIG0OB8UdVa/${table}`,
    data
  );

  return result;
}

const airtableGetAll = async (method, table) => {
  var offset = 0
  var list_rows = []
  while (true) {
    const config = {
      method: method,
      url: `https://api.airtable.com/v0/appbSfEIG0OB8UdVa/${table}?offset=${offset}`,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization:
          'Bearer patbAqdmJO0ntHHYL.e784ce069516df6c8f7cbcda8279ed0ca28cae0d4f1b1f0a3320c6d7529e0f14',
      },
    };
    console.log(`https://api.airtable.com/v0/appbSfEIG0OB8UdVa/${table}?offset=${offset}`)
    if(offset === undefined){
      break
    }
    try {
      var response = await axios.request(config);
      list_rows.push(response.data.records)
      try{
        offset = response.data.offset
      } catch (err) {
        // console.log(err);
        break
      } 
    } catch (err) {
      // console.log(err);
    }
  };
  return list_rows
}


module.exports = { airtableGet, airtableGetOne, airtablePost, airtableAnswers,airtableGetAll };