import { Game } from '../types/game'
import { Choice } from '../types/choice'
import { Select } from './select'
import { GameController } from './gameController'
import { GameMap } from './gameMap'

export class Wander {

  private games: Map<string, Game> = new Map<string, Game>()
  private options:Choice[] = []

  constructor () {
    this.fetchGames()
  }

  public start () {
    let selection = Select.builder('What Game?', this.options)
    console.log(selection)
    let selectedGame: Game = <Game> this.games.get(selection)
    let gameMap = new GameMap(selectedGame)
    new GameController(gameMap)
  }

  private fetchGames () {
    let gameName = "action_castle"
    let game: Game = require(`../../../games/${gameName}.json`)
    this.games.set(gameName, game)
    this.options = Choice.build([game.title])
  }
}
