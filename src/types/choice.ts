export class Choice {
  name: string
  value: string

  constructor (name: string, value?: string) {
    this.name = name
    if (value) {
      this.value = this.cleanupValue(value)
    } else {
      this.value = this.cleanupValue(name)
    }
  }

  static build (array: string[]) {
    let options: Choice[] = []
    array.forEach(option => { options.push(new Choice(option)) })
    return options
  }

  private cleanupValue (originalString: string) {
    return originalString.toLowerCase().replace(/ /g,'_')
  }
}
