function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function getRecordId(records) {
  return records.records[0].id;
}

function getFields(records) {
  const fields = records.records.map((r) => {
    return r.fields;
  });
  return fields;
}

function getFlow(records, flow) {
  const flujo = records.filter((r) => {
    if (r.id === flow) {
      return r;
    }
  })[0];
  return flujo;
}

function filterRecordsById(records, value, name) {
  var items = records;
  for (var i in items.records) {
    var record = items.records[i];
    var id = record.fields.id;
    if (id === value) {
      if (name === true) {
        return record.fields.nombre;
      } else if (name === false) {
        return record.fields.correo;
      } else {
        return null;
      }
    }
  }
  return null;
}

function createSortedList(records) {
  records.sort((a, b) => (a.id > b.id ? 1 : -1));
  let opciones = [];
  records.map((r) => {
    let id = r.id;
    let nombre = r.nombre;
    let opcion = id + '  ' + nombre;

    opciones.push(opcion);
  });

  return opciones;
}

function createWaLink(link, name, email, motive) {
  const walink =
    link +
    `&text=Hola%20soy%20${name.replace(/\s/g, '%20')},` +
    (email === undefined ? '' : '%20mi%20correo%20es%20' + email + '%20y') +
    `%20quisiera%20saber%20informaci%C3%B3n%20sobre%20${motive.replace(
      /\s/g,
      '%20'
    )}`;
  return walink;
}

function generateStoreResponse(link, name, email, motive, address) {
  if (link) {
    const walink = createWaLink(link, name, email, motive);
    return `${address} ${walink}`;
  }

  switch (motive) {
    case 'Horarios y Ubicaciones':
      return address;
    case 'Cotizar productos':
      return `${address}\n\nPronto te escribiran de esta sucursal para ayudarte con la cotización que necesitas 😄`;
    case 'Promociones':
      return `${address}\n\nPronto te escribiran de esta sucursal para comentarte sobre nuestras promociones 😄`;
    case 'Disponibilidad':
      return `${address}\n\nPronto te escribiran de esta sucursal, comentales que producto estás buscando y ellos te daran información sobre su disponibilidad😄`;
  }
}

function generateAlert(name, motive, sucursal, phone, complaint) {
  if (sucursal != null) {
    return `El cliente *${name}* esta queriendo contactar la sucursal de ${sucursal} y quiere información sobre *${motive}* dirigete a este link para iniciar una conversación con el cliente: \n\n https://api.whatsapp.com/send?phone=+${phone}`;
  } else {
    return `El cliente *${name}* me contactó con la siguiente queja *${complaint}* dirigete a este link para iniciar una conversación con el cliente: \n\n https://api.whatsapp.com/send?phone=+${phone}`;
  }
}

module.exports = {
  sleep,
  getRecordId,
  getFields,
  getFlow,
  filterRecordsById,
  createSortedList,
  generateStoreResponse,
  generateAlert,
};
