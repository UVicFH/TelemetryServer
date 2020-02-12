/**
 * @file Websocket stuff
 *
 * @author Jayden Chan
 * @author Brendon Earl
 * @author Chad McColm
 */

import * as SocketIO from "socket.io";
import { Server as HTTPServer } from "http";

import { getLogger } from "../logger";

const logger = getLogger("socket");

let socketServer: SocketIO.Server;

const SOCKET_CHANNEL_DATA = "tele_data";
const SOCKET_CHANNEL_RANGE = "tele_range";
const SOCKET_CHANNEL_CONN = "tele_connection_status";

/**
 * Activates the socket
 *
 * @param {HTTPServer} server The HTTP server to bind to
 */
export function activate(server: HTTPServer) {
  logger.info("Initializing socket.io server");
  try {
    socketServer = SocketIO(server);

    socketServer.on("connect", socket => {
      logger.info(`User connected: ${socket.client.id}`);
    });

    socketServer.on("disconnect", () => {
      logger.info("A socket user disconnected");
    });
  } catch (e) {
    logger.error("Failed to initialize socket.io server");
    logger.error(e);

    throw e;
  }
}

/**
 * Asserts that the server exists
 */
function assertServerExists() {
  if (!socketServer) {
    throw new Error(`Socket server isn't initialized`);
  }
}

/**
 * Send some telemetry data over the socket
 *
 * @param {Any} data The Data to send
 */
export function sendData(data: any) {
  assertServerExists();
  socketServer.emit(SOCKET_CHANNEL_DATA, data);
}

/**
 * Schema for a 'range' object, which defines the
 * min and max values for the metric at `key`
 */
export interface RangeData {
  key: string;
  min: number;
  max: number;
}

/**
 * Send a data range over the socket
 *
 * @param {RangeData} range The range object to send
 */
export function sendRange(range: RangeData) {
  assertServerExists();
  socketServer.emit(SOCKET_CHANNEL_RANGE, range);
}

/**
 * An MQTT connection status represents the server's connection
 * status to the MQTT broker
 *
 * CONNECTED    - Server is connected and receiving data
 * NO DATA      - Server is connected but there is no data coming through.
 *                This likely means the car got disconnected (behind a tree, etc)
 * DISCONNECTED - Server is disconnected from the broker
 */
export type MQTTConnectionStatus = "CONNECTED" | "NO DATA" | "DISCONNECTED";

/**
 * Send a connection status update over the socket
 *
 * @param {MQTTConnectionStatus} status The connection status
 */
export function sendConnectionStatus(status: MQTTConnectionStatus) {
  assertServerExists();
  socketServer.emit(SOCKET_CHANNEL_CONN, status);
}
