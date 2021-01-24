import * as Response from './response';

export class Parse {
  constructor(command: string) {
    const response: { [k: string]: string } = {};

    const lowerCaseCommand = command.toLowerCase();

    Response.info('input', lowerCaseCommand);

    // We're going to expect just a one-word action for now.
    const i = lowerCaseCommand.indexOf(' ');
    if (i !== -1) {
      const splitsies = [
        lowerCaseCommand.slice(0, i),
        lowerCaseCommand.slice(i + 1),
      ];
      response.action = splitsies[0];
      response.subject = splitsies[1]
        .replace('a ', '')
        .replace('an ', '')
        .replace('some ', '')
        .replace('the ', '');
    } else {
      response.action = lowerCaseCommand;
    }

    return response;
  }
}
