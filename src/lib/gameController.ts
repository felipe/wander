import {
  AquireActions,
  ManipulationActions,
  MovementActions,
  ObservationActions,
  SupportActions
} from '../types/actions';
import { MapOct } from '../types/mapOct';
import { MapSquare } from '../types/mapSquare';
import { User } from '../types/user';
import { GameMap } from './gameMap';
import { Items } from './items';
import { Parse } from './parse';
import * as Response from './response';
import { Select } from './select';

import chalk from 'chalk';

export class GameController {
  public user: User;
  public items: Items;
  public map: GameMap;
  public currentTile: MapSquare | MapOct;
  constructor(map: GameMap, items: Items) {
    this.map = map;
    this.items = items;
    this.user = new User('clu');
    this.currentTile = this.map.startTile;
    this.enterTile();
  }

  public actionQuery(): void {
    const inputString = Select.getAction().trim();
    const parsedInput: any = new Parse(inputString);
    const selectedAction = parsedInput.action.toLowerCase();
    const selectedSubject = parsedInput.subject;

    Response.info('intent', selectedAction);

    // TODO: Move all this into the Parse class
    if (Object.values(AquireActions).includes(selectedAction)) {
      this.aquireAction(selectedAction, selectedSubject);
    } else if (Object.values(ManipulationActions).includes(selectedAction)) {
      this.manipulateAction(selectedAction);
    } else if (Object.values(MovementActions).includes(selectedAction)) {
      Response.console('Movement Action');

      // any axis
      if (selectedAction === 'in') {
        this.setTile(this.currentTile.getIn() as MapSquare | MapOct);
      }
      if (selectedAction === 'out') {
        this.setTile(this.currentTile.getOut() as MapSquare | MapOct);
      }

      // x axis
      if (selectedAction === 'top' || selectedAction === 'north') {
        this.setTile(this.currentTile.getTop() as MapSquare | MapOct);
      }
      if (selectedAction === 'left' || selectedAction === 'west') {
        this.setTile(this.currentTile.getLeft() as MapSquare | MapOct);
      }
      if (selectedAction === 'right' || selectedAction === 'east') {
        this.setTile(this.currentTile.getRight() as MapSquare | MapOct);
      }
      if (selectedAction === 'bottom' || selectedAction === 'south') {
        this.setTile(this.currentTile.getBottom() as MapSquare | MapOct);
      }
      if (selectedAction === 'top-left' || selectedAction === 'north-west') {
        this.setTile(this.currentTile.getTopLeft() as MapSquare | MapOct);
      }
      if (selectedAction === 'top-right' || selectedAction === 'north-east') {
        this.setTile(this.currentTile.getTopRight() as MapSquare | MapOct);
      }
      if (selectedAction === 'bottom-left' || selectedAction === 'south-west') {
        this.setTile(this.currentTile.getBottomRight() as MapSquare | MapOct);
      }
      if (
        selectedAction === 'bottom-right' ||
        selectedAction === 'south-east'
      ) {
        this.setTile(this.currentTile.getBottomRight() as MapSquare | MapOct);
      }

      // y axis
      if (selectedAction === 'up') {
        this.setTile(this.currentTile.getUp() as MapSquare | MapOct);
      }

      if (selectedAction === 'down') {
        this.setTile(this.currentTile.getDown() as MapSquare | MapOct);
      }

      this.enterTile();
    } else if (Object.values(ObservationActions).includes(selectedAction)) {
      Response.console('Observation Action');
      this.observeAction(selectedAction, selectedSubject);
    } else if (Object.values(SupportActions).includes(selectedAction)) {
      this.supportAction(selectedAction);
    } else if (selectedAction === 'exit' || selectedAction === 'quit') {
      process.exit(0);
    } else {
      Response.console('Invalid Action');
      this.actionQuery();
    }
  }

  public setTile(tile: MapSquare | MapOct | null) {
    if (tile != null) {
      this.currentTile = tile;
    } else {
      Response.console('Invalid Direction');
    }
  }

  public enterTile() {
    Response.console('');
    Response.console(this.getFullDescription());
    Response.console(this.currentTile.getExits());
    this.actionQuery();
  }

  public aquireAction(action: string, subject: string) {
    Response.console('Aquire action');
    const item = this.items.getItem(subject);
    if (item) {
      Response.console(this.user.addToInventory(item));
      item.take();
    }
    this.actionQuery();
  }

  public manipulateAction(action: string) {
    Response.console('Moved/Enabled Action');
    this.actionQuery();
  }

  public observeAction(action: string, subject: string) {
    Response.console(this.items.describe(this.currentTile, subject));
    this.actionQuery();
  }

  public supportAction(action: string) {
    switch (action) {
      case 'help':
        Response.console('Help, Inventory, Save, Load, Restore, Score, Quit');
        break;
      case 'inventory':
        const inventory = this.user.listInventory();
        Response.console(
          inventory === '' ? 'Your Inventory is empty.' : inventory
        );
        break;
      default:
        Response.console(action + ' Action');
    }

    this.actionQuery();
  }

  private getFullDescription() {
    return this.currentTile.description + ' ' + this.getTextItemList();
  }

  private getTextItemList() {
    let items = '';
    this.currentTile.items.forEach(item => {
      if (!this.items.isHidden(item) && !this.items.wasTaken(item)) {
        items += `There is a ${chalk.underline.bold(
          this.items.getName(item)
        )} here. `;
      }
    });
    return items;
  }
}
