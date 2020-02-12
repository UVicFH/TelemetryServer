/**
 * @file Yargs stuff
 *
 * @author Jayden Chan
 */

import * as yargs from "yargs";
import { version } from "../package.json";

const USAGE_MSG = `UVic Formula Hybrid Telemetry server v${version}

Usage: telemetry-server <cmd> [args...]`;

yargs
  .usage(USAGE_MSG)
  .commandDir("cmd")
  .scriptName("telemetry-server")
  .recommendCommands()
  .option("v", {
    alias: "version",
    global: false,
    type: "boolean",
    describe: "Show current version",
    skipValidation: true
  })
  .version(false)
  .help("help")
  .alias("help", "h")
  .showHelpOnFail(false)
  .parse(process.argv.slice(2), (_, argv, output) => {
    if (argv.version === true && !argv._.length) {
      console.log(version);
    } else if (output) {
      console.log(output);
    }
  });
