export class Choice {
  public static build(array: string[]) {
    const options: Choice[] = [];
    array.forEach(option => {
      options.push(new Choice(option));
    });
    return options;
  }
  public name: string;
  public value: string;

  constructor(name: string, value?: string) {
    this.name = name;
    this.value = value ? this.cleanupValue(value) : this.cleanupValue(name);
  }

  private cleanupValue(originalString: string) {
    return originalString.toLowerCase().replace(/ /g, '_');
  }
}
