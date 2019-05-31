/* global Promise */

/**
 * @file Storage Manager
 *
 * @author Jayden Chan
 * @author Brendon Earl
 */

import {
  MongoClient,
  Collection,
  InsertOneWriteOpResult,
  InsertWriteOpResult,
} from 'mongodb';

import * as assert from 'assert';
import { getLogger } from './logger';

const logger = getLogger('storage.ts');

const DB_NAME = 'telemetry';
const DATABASE_URL = 'mongodb://localhost:27017';
const COLLECTION_NAME = `snapshots-${new Date(Date.now()).toJSON()}`;

let collection: Collection;

/**
 * Open a connection to the Mongo server running at `DATABASE_URL`
 *
 * @return {Promise} A promise returning nothing
 */
export async function openConnection(): Promise<void> {
  logger.info('Initializing MongoDB connection');

  return new Promise<void>((resolve, reject) => {
    MongoClient.connect(DATABASE_URL)
      .then(client => {
        logger.info('Connected successfully to MongoDB server');

        const db = client.db(DB_NAME);
        collection = db.collection(COLLECTION_NAME);

        if (!collection) {
          logger.info('Collection does not exist, creating...');
          db.createCollection(COLLECTION_NAME)
            .then(createdCollection => {
              collection = createdCollection;
              resolve();
            })
            .catch(e => {
              logger.error('Error encountered when creating collection');
              logger.error(e);
              reject(e);
            });
        } else {
          logger.info('Collection exists, using');
          resolve();
        }
      })
      .catch(e => {
        logger.error('Failed to open Mongo connection:');
        reject(e);
      });
  });
}

/**
 * A TelemetryEntry is an entry or set of entries to
 * be inserted into the Mongo db
 */
export type TelemetryEntry = Array<any> | any;

/**
 * WriteDataResult is the result of the Mongo insert operation
 */
export type WriteDataResult = InsertOneWriteOpResult | InsertWriteOpResult;

/**
 * Writes the specified data to the Mongo DB
 *
 * @param {TelemetryEntry} data The data to write
 *
 * @return {Promise} The result of the insert operation
 */
export async function writeData(data: TelemetryEntry): Promise<WriteDataResult> {
  return new Promise<WriteDataResult>((resolve, reject) => {
    if (!collection) {
      reject(`Collection isn't properly initialized`);
    }

    if (Array.isArray(data)) {
      collection.insertMany(data)
        .then(result => {
          assert.equal(data.length, result.result.n);
          assert.equal(data.length, result.ops.length);
          resolve(result);
        })
        .catch(e => {
          logger.error('An error occurred while writing data to Mongo');
          logger.error(e);
          reject(e);
        });
    } else {
      collection.insert(data)
        .then(result => {
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          resolve(result);
        })
        .catch(e => {
          logger.error('An error occurred while writing data to Mongo');
          logger.error(e);
          reject(e);
        });
    }
  });
}
