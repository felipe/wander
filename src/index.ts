export * from './types/choice';
export * from './types/oct';
export * from './types/meta';
export * from './types/mapOct';
export * from './types/mapSquare';

export * from './lib/parse';
export * from './lib/select';
export * from './lib/wander';

import { Wander } from '.';
import * as Response from './lib/response';

const exit = () => {
  process.exit(-1);
};

const start = () => {
  Response.info('start to wander');
  const wander = new Wander();
  wander.start();
};

switch (process.argv.length) {
  case 1:
  case 2:
    Response.console('Usage: ' + __filename + ' start');
    exit();
    break;
  case 3:
    process.argv[2] === 'start' ? start() : exit();
    break;
}

// if (process.argv.length <= 2)  {
//   if(process.argv[1].indexOf('test-worker.js') != -1) {
//     process.exit(-1)
//   } else {
//     Response.console("Usage: " + __filename + " start");
//     process.exit(-1)
//   }
// } else {
//   if (process.argv[2] === "start") {
//     Response.info("start to wander")
//     const wander = new Wander();
//     wander.start();
//   }
// }
