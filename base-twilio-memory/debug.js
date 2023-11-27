const { airtableGetOne, airtablePost } = require('./services/airtable-client');
const { getRecordId } = require('./tools/utils');

async function getIt() {
  let localidad = await airtableGetOne('ciudades', 1);
  let sucursal = await airtableGetOne('sucursales', 1);
  let cliente = await airtableGetOne('clientes', 584241604932);

  const records = {
    fields: {
      motivo: 'info',
      cotizar: false,
      localidad: [getRecordId(localidad)],
      sucursal: [getRecordId(sucursal)],
      cliente: [getRecordId(cliente)],
    },
  };
  const result = await airtablePost('conversaciones', records);
  console.log(result);
}

getIt();
