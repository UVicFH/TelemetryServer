const data_store = require("./service");
const assert = require("assert");

const test_insert_docs = async data => {
  let result;

  // Insert some test objects
  try {
    result = await data_store.collection.insertMany([
      { a: 1 },
      { a: 2 },
      { a: 3 }
    ]);
  } catch (error) {
    console.error(`Failed inserting test data ${data}`);
  }

  // test objects where inserted
  try {
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
  } catch (error) {
    console.error(`Failed test assertion ${data}`);
    throw error;
  }

  console.log("Inserted 3 documents into the collection");
  return result;
};

/**
 * Write data to database
 * @param {Array | *} data - data or datum to be added to the data store
 */
const write_data = async data => {
  let result;

  try {
    // Use appropraite insert depending on data type
    result = Array.isArray(data)
      ? await data_store.collection.insertMany(data)
      : await data_store.collection.insert(data);
  } catch (error) {
    console.error(`Failed inserting data ${data}`);
    throw error;
  }

  // assert insertion was successful
  try {
    if (Array.isArray(data)) {
      assert.equal(data.length, await esult.result.n);
      assert.equal(data.length, await result.ops.length);
    } else {
      assert.equal(1, await result.result.n);
      assert.equal(1, await result.ops.length);
    }
  } catch (error) {
    console.error(`Failed assertion: ${error}`);
    throw error;
  }

  // Notify user insertion sucessful
  console.log(`Inserted ${result.result.n} documents into the collection`);
  return result;
};

module.exports = {
  write_data
};

setTimeout(() => test_insert_docs(), 2000);
