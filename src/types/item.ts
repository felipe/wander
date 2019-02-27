export interface Item {
  _id: string;
  _name: string;
  _quantity: number;
  _description: string;
  _destroyed: boolean;
}

export class Item implements Item {
  constructor(id: string, item: any) {
    this._id = id;
    this._name = item.name;
    this._quantity = item.quantity;
    this._description = item.description;
    this._destroyed = false;
  }

  public isDestroyed() {
    return this._destroyed;
  }

  public getId() {
    return this._id;
  }

  public getName() {
    return this._name;
  }

  public getQuantity() {
    return this._quantity;
  }

  public getDescription() {
    return this._description;
  }

  public destroy() {
    this._destroyed = true;
  }
}
