const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = `${new Date(Date.now()).toJSON()}-session`;

// Database and Client
let db, client;

/**
 * Open connection to MongoDb server
 */
const open_connection = MongoClient.connect(url, function(err, new_client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  client = new_client;
  db = client.db(dbName);
});

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

module.exports = {
  open_connection,
  close_connection
};
