/**
 * @file Storage Manager - Core Service
 */

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database & Collection Name
const dbName = `telemetry`;
const collName = `snapshots-${new Date(Date.now()).toJSON()}`;

// Database and Client
let db, client;

/**
 * Open connection to MongoDb server
 */
const open_connection = async () => {
  console.info('Initializing MongoDB connection');

  try {
    client = await MongoClient.connect(url);
  } catch (error) {
    console.error(`Failed to connect MongoClient to url: ${url}`);
    return;
  }
  console.info('Connected successfully to MongoDB server');

  try {
    db = await client.db(dbName);
  } catch (error) {
    console.error(`Failed to open connection to db: ${dbName}`);
  }

  try {
    module.exports.collection = await db.collection(collName);
    if (module.exports.collection === undefined)
      module.exports.collection = await db.createCollection(collName);
  } catch (error) {
    console.error(`Failed to open collection: ${collName}`);
    return;
  }

  console.info('MongoDB connection initialize successfully');
};

/**
 * Close connection to MongoDB server
 */
const close_connection = () => {
  module.exports.collection = undefined;

  // Stop close attempt if db or client is already undefined
  if (db === undefined || client === undefined) {
    if (db === undefined && client === undefined)
      console.error(
        `db and client are undefined, seems you've already closed this connection`
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
  console.info('Disconnected successfully from server');
  db = undefined;
  client = undefined;
};

module.exports = {
  open_connection,
  close_connection,
  collection: undefined,
};
