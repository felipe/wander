import { Choice } from '../types/choice';
import { Game } from '../types/game';
import { GameController } from './gameController';
import { GameMap } from './gameMap';
import { Items } from './items';
import * as Response from './response';
import { Select } from './select';

const gamesPath = './games/';

export class Wander {
  private games: Map<string, Game> = new Map<string, Game>();
  private options: Choice[] = [];

  public async start() {
    await this.fetchGames();

    const selection = Select.builder('What Game?', this.options);
    const selectedGame: Game = this.games.get(selection) as Game;
    const gameMap = new GameMap(selectedGame);
    const gameItems = new Items(selectedGame.items);

    if (selectedGame.banner) {
      selectedGame.banner.forEach((row) => {
        Response.console(row);
      });
    } else {
      Response.console(selectedGame.title);
    }

    return new GameController(gameMap, gameItems);
  }

  private async fetchGames() {
    await new Promise((resolve) => {
      fs.readdir(gamesPath, (err, gameFiles) => {
        if (err) {
          throw err;
        }
        gameFiles.forEach((gameFile) => {
          const game: Game = require('../../.' + gamesPath + gameFile);
          this.options.push(new Choice(game.title, game.node));
          this.games.set(game.node, game);
        });
        resolve();
      });
    }).catch((err) => {
      throw err;
    });
  }
}
