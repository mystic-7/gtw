
function filterById(records, value) {

    var items = JSON.parse(records)
    for (var i in items.records) {
    var record = items.records[i];
    var id = record.fields.id;
    if (id === value) {
      return record.fields.nombre;
    }
  }
  return null;
}

module.exports = {filterById}