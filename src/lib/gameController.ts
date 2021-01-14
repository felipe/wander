import {
  AquireActions,
  BellicoseActions,
  ManipulationActions,
  MovementActions,
  ObservationActions,
  SupportActions,
  UsageActions,
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
    } else if (Object.values(UsageActions).includes(selectedAction)) {
      this.usageAction(selectedAction, selectedSubject);
    } else if (Object.values(BellicoseActions).includes(selectedAction)) {
      this.bellicoseAction(selectedAction, selectedSubject);
    } else if (Object.values(MovementActions).includes(selectedAction)) {
      Response.debug('action', 'Movement');

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
      Response.debug('action', 'Observation');
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
    Response.debug('action', 'Aquire');
    try {
      const item = this.items.getItem(this.currentTile, subject);

      if (item && item.isObtainable() && !item.wasTaken()) {
        const message = item.getAquisitionMessage();
        if (message) {
          Response.console(message);
        }
        Response.console(this.user.addToInventory(item));
        item.take();
      } else if (item) {
        const message = item.getAquisitionMessage(false);
        Response.console(
          message
            ? message
            : `There is no ${item?.getName()} here. Did you take it already?`
        );
      } else {
        // TODO: Is this a mistake? no item to acquire
        Response.console(
          `${subject.charAt(0).toUpperCase() + subject.slice(1)}?! Where!?`
        );
      }
    } catch (e) {
      Response.error('AquireActionError', e);
      Response.console('I dont think I can take that.');
    }
    this.actionQuery();
  }

  public usageAction(action: string, subject: string) {
    // Using an item requires you to have it on your person
    const item = this.user.getItem(this.items.getItemId(subject));
    if (item && item.getDurability() > 0) {
      // Item exists and is not spent
      const outcome = item.getUsageOutcome(this.currentTile.id);
      if (outcome) {
        const outcomeItem = this.items.getItem(this.currentTile, outcome);
        if (outcomeItem && !outcomeItem._taken) {
          // The current tile has an outcome for the action
          Response.console(item.getUsageMessage());
          Response.console(this.user.addToInventory(outcomeItem));
          outcomeItem.take();
        } else {
          Response.console(`Have you done this before?`);
        }
      } else {
        Response.console(
          `There are many places where you can do that. This is not one of them.`
        );
      }
    } else {
      Response.console(`You do not seem to have a ${subject} to use.`);
    }

    Response.console('Use Action');
    this.actionQuery();
  }

  public bellicoseAction(action: string, subject: string) {
    Response.console('Attack/Defend Action');
    this.actionQuery();
  }

  public manipulateAction(action: string) {
    Response.console('Moved/Enabled Action');
    this.actionQuery();
  }

  public observeAction(action: string, subject: string) {
    // Describe the current tile if no subject is given.
    Response.console(
      subject
        ? this.items.describe(this.currentTile, subject)
        : this.getFullDetailedDescription()
    );
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
          inventory === ''
            ? 'Your Inventory is empty.'
            : 'Your inventory contains: \n' + inventory
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

  private getFullDetailedDescription() {
    return this.currentTile.detailedDescription
      ? this.currentTile.detailedDescription
      : this.currentTile.description + ' ' + this.getTextItemList();
  }

  private getTextItemList() {
    let items = '';
    this.currentTile.items.forEach((item) => {
      if (!this.items.isHidden(item) && !this.items.wasTaken(item)) {
        items += `There is a ${chalk.underline.bold(
          this.items.getName(item)
        )} here. `;
      }
    });
    return items;
  }
}
