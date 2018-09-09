import { Choice } from '../types/choice'
import { Select } from './select'
import { GameMap } from './gameMap'

export class Wander {

  private games:Choice[] = [];

  constructor () {
    this.games = Choice.build(["Action Castle"]);
  }
  public start () {
    let selectedGame = Select.builder('What Game?', this.games);
    new GameMap(selectedGame);
  }
}
