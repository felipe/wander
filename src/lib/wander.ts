import { Choice } from '../types/choice';
import { Game } from '../types/game';
import { GameController } from './gameController';
import { GameMap } from './gameMap';
import { Items } from './items';
import * as Response from './response';
import { Select } from './select';

export class Wander {
  private games: Map<string, Game> = new Map<string, Game>();
  private options: Choice[] = [];

  constructor() {
    this.fetchGames();
  }

  public start() {
    const selection = Select.builder('What Game?', this.options);
    Response.console(selection);
    const selectedGame: Game = this.games.get(selection) as Game;
    const gameMap = new GameMap(selectedGame);
    const gameItems = new Items(selectedGame.items);
    return new GameController(gameMap, gameItems);
  }

  private fetchGames() {
    const gameName = 'action_castle';
    const game: Game = require(`../../../games/${gameName}.json`);
    this.games.set(gameName, game);
    this.options = Choice.build([game.title]);
  }
}
