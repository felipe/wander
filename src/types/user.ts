import { Item } from './item';

export interface User {
  readonly _name: string;
  readonly _inventory: ReadonlyArray<Item>;
}
