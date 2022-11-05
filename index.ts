import "dotenv/config";

import { Minari } from "./src/Minari";
new Minari().start();

process.on("uncaughtException", err => console.error(err));
process.on("uncaughtExceptionMonitor", err => console.error(err));
process.on("unhandledRejection", err => console.error(err));