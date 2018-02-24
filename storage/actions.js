const data_store = require("./service");

const insertDocuments = function(callback) {
  // Get the documents collection
  const collection = data_store.collection("documents");
  // Insert some documents
  collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

module.exports = {
  write_data: function(cb) {
    insertDocuments(cb);
  }
};
