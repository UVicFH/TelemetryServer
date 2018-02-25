const data_store = require("./service");
const assert = require("assert");

const test_insert_docs = (data, callback = () => {}) => {
  // Insert some documents
  data_store.insert_data([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

/**
 * Write data to database
 * @param {Array | *} data
 * @callback {inser_callback} callback - callback called after data has been inserted (or failed to)
 */
const write_data = (data, callback = () => {}) => {
  // Use appropraite insert depending on data type
  if (Array.isArray(data)) data_store.insert_data(data, callback);
  else data_store.insert_datum(data, callback);

  // assert insertion was successful
  assert.equal(err, null);
  if (Array.isArray(data)) {
    assert.equal(data.length, result.result.n);
    assert.equal(data.length, result.ops.length);
  } else {
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
  }

  // Notify user insertion sucessful
  console.log(`Inserted ${result.result.n} documents into the collection`);
  callback(result);
};

module.exports = {
  write_data
};

test_insert_docs();
