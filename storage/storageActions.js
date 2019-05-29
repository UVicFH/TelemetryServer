/**
 * @file Storage Manager - Internal Actions
 */

const data_store = require('./storageService');
const assert = require('assert');

/**
 * Write data to database
 * @param {Array | *} data - data or datum to be added to the data store
 */
const write_data = async (data) => {
  let result;

  try {
    if (data_store.collection === undefined) return;
    // Use appropraite insert depending on data type
    if (Array.isArray(data)) {
      result = await data_store.collection.insertMany(data);
    } else {
      result = await data_store.collection.insert(data);
    }
  } catch (error) {
    console.error(`Failed inserting data ${data}`);
    data_store.close_connection();
    throw error;
  }

  // assert insertion was successful
  try {
    if (Array.isArray(data)) {
      assert.equal(data.length, await result.result.n);
      assert.equal(data.length, await result.ops.length);
    } else {
      assert.equal(1, await result.result.n);
      assert.equal(1, await result.ops.length);
    }
  } catch (error) {
    console.error(`Failed assertion: ${error}`);
    data_store.close_connection();
    throw error;
  }

  // Notify user insertion sucessful
  // console.debug(`Inserted ${result.result.n} documents into the collection`);
  return result;
};

module.exports = {
  write_data,
};
