export interface Item {
  _id: string;
  _hidden: boolean;
  _name: string;
  _quantity: number;
  _durability: number;
  _description: string;
  _destroyed: boolean;
  _taken: boolean;
  _value: number;
}

export class Item implements Item {
  constructor(id: string, item: any) {
    this._id = id;
    this._name = item.name;
    this._quantity = item.quantity;
    this._durability = item.durability;
    this._description = item.description;
    this._destroyed = false;
    this._hidden = item.hidden ? item.hidden : false;
    this._taken = item.taken ? item.taken : false;
    this._value = item.value;
  }

  public isDestroyed() {
    return this._destroyed;
  }

  public isHidden() {
    return this._hidden;
  }

  public wasTaken() {
    return this._taken;
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

  public take() {
    this._taken = true;
  }
}
