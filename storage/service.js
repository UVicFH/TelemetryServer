const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database & Collection Name
const dbName = `formulaHybrid`;
const collName = `${new Date(Date.now()).toJSON()}-session`;

// Database and Client
let db, client, collection;

/**
 * Open connection to MongoDb server
 */
const open_connection = () => {
  console.log("Initializing MongoDB connection");

  MongoClient.connect(url, function(err, new_client) {
    assert.equal(null, err);
    console.log("Connected successfully to MongoDB server");

    client = new_client;
    try {
      db = client.db(dbName);
    } catch (error) {
      console.error(`Failed to open connection to db: ${dbName}`);
      throw error;
    }

    try {
      collection = db.collection(collName);
    } catch (error) {
      console.error(`Failed to open collection: ${colName}`);
      throw error;
    }
  });

  console.log("MongoDB connection initialize successfully");
};

/**
 * Close connection to MongoDB server
 */
const close_connection = function() {
  // Stop close attempt if db or client is already undefined
  if (db === undefined || client === undefined) {
    if (db === undefined && client === undefined)
      console.error(
        "db and client are undefined, seems you've already closed this connection"
      );
    else
      console.error(
        `db: ${db}, client: ${client}. This is unexpected behaviour, something bad has happened`
      );
    return;
  }

  // Try closing client
  try {
    client.close();
  } catch (error) {
    console.error(`Could not close connection to server due to ${error}`);
    return;
  }

  // Notify of sucessful disconnect and set connection vars to undefined
  console.log("Connected successfully to server");
  db = undefined;
  client = undefined;
};

/**
 * Insert a single datum into the collection
 * @param {Object} datum - datum to be added to data store
 * @callback {insert_callback} cb - callback called after data has been inserted (or failed to)
 */
const insert_datum = (datum, cb) => {
  collection.insert(datum, cb);
};

/**
 * Insert an array of data into the collection
 * @param {Array} data
 * @callback {insert_callback} cb - callback called after data has been inserted (or failed to)
 */
const insert_data = (data, cb) => {
  collection.insertMany(data, cb);
};

/**
 * callback from inserting data into the data store
 * @callback insert_callback
 * @param {*} err - any error that occured when inserting data into data store
 * @param {Object} result - result object returned form data store
 */

module.exports = {
  open_connection,
  close_connection,
  insert_datum,
  insert_data
};
