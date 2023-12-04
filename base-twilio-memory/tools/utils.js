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

function filterRecordsById(records, value,name) {
  var items = records;
  for (var i in items.records) {
    var record = items.records[i];
    var id = record.fields.id;
    if (id === value) {
      if (name === true){
        return record.fields.nombre;
      }
      else if (name === false){
        return record.fields.correo;
      }
      else{
        return null
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

module.exports = {
  getRecordId,
  getFields,
  getFlow,
  filterRecordsById,
  createSortedList,
};
