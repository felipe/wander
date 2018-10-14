export interface Item {
  _id: string
  _name: string
  _description: string

  _destroyed: boolean
}

export class Item implements Item {
  constructor(id: string, item: {}) {
    this._id = id
    this._name = item['name']
    this._description = item['description']
    this._destroyed = false
  }

  public isDestroyed() {
    return this._destroyed
  }

  public getName() {
    return this._name
  }

  public getDescription() {
    return this._description
  }
}
