import * as Response from './response'

export class Parse {
  constructor (command: string) {
    let response: {[k: string]: string} = {};

    Response.info('input', command)

    // We're going to expect just a one-word action for now.
    let i = command.indexOf(' ');
    if (i !== -1) {
      let splitsies = [command.slice(0,i), command.slice(i+1)];
      response['action'] = splitsies[0]
      response['subject'] = splitsies[1]
    } else {
      response['action'] = command
    }

    return response
  }
}
