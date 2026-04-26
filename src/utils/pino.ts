import { mkdir } from "node:fs";
import pino, { destination } from "pino";

 const logger=pino({
    transport:{
        target:"pino/file",
        options:{
            destination:"./src/public/logs/log.txt",
            mkdir:true
        }
    }
});

export default logger;