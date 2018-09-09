import * as readlineSync from 'readline-sync'

import { Choice } from '../types/choice'

export class Select {
  public static builder (question: string, choices: Array<Choice>) {
    const values = choices.map((el) => {
      let o = Object.assign({}, el)
      return o.name.toUpperCase()
    })
    const index = readlineSync.keyInSelect(values, question)
    if (index === -1) { process.exit() }
    return choices[index].value
  }

  public static inline (question: string) {
    const response = readlineSync.question('\n' + question + ' ')
    return response
  }

  public static YNQuestion (question: string) {
    return readlineSync.keyInYN('\n' + question + ' ')
  }
}
