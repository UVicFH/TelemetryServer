import { Arguments } from 'yargs';

export const command = 'run';
export const desc = 'Read and process incomming MQTT messages';

export const handler = async (argv: Arguments) => {
  argv._.shift();
  const args = argv._;
};

export const builder = {
  noMongo: {
    alias: 'm',
    type: 'boolean',
    describe: 'Do not log the telemetry data to Mongo',
  },
  port: {
    alias: 'p',
    type: 'number',
    describe: 'The port to run on',
  },
  socketSendDelay: {
    alias: 's',
    type: 'number',
    describe: 'Milliseconds between socket updates',
  },
};
