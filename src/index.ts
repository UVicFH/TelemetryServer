/**
 * @file Yargs stuff
 *
 * @author Jayden Chan
 */

import * as yargs from 'yargs';
import { version } from '../package.json';

yargs
  .usage('\nUsage: telemetry-server <cmd> [args]')
  .commandDir('cmd')
  .scriptName('telemetry-server')
  .recommendCommands()
  .option('v', {
    alias: 'version',
    global: false,
    type: 'boolean',
    describe: 'Show current version',
    skipValidation: true,
  })
  .version(false)
  .help('h')
  .alias('h', 'help')
  .showHelpOnFail(true)
  .demandCommand(1, 'Please specify a command')
  .parse(process.argv.slice(2), (_, argv, output) => {
    if (argv.version === true && !argv._.length) {
      console.log(version);
    } else {
      console.log(output);
    }
  });
