export * from './types/choice'
export * from './types/oct'
export * from './types/meta'
export * from './types/mapOct'
export * from './types/mapSquare'

export * from './lib/parse'
export * from './lib/select'
export * from './lib/wander'

import { Wander } from '.'
import * as Response from './lib/response'

if (process.argv.length <= 2)  {
  if(process.argv[1].indexOf('test-worker.js') != -1) {
    process.exit(-1)
  } else {
    Response.console("Usage: " + __filename + " start");
    process.exit(-1)
  }
} else {
  if (process.argv[2] === "start") {
    Response.info("start to wander")
    const wander = new Wander();
    wander.start();
  }
}
