import { Application } from 'pixi.js';
import { CANVAS } from './constants';
import Controller from './game/controller';

export default class Main {

  private _app: Application;
  private _gameController: Controller;

  constructor() {
    this._app = new Application({
      width: CANVAS.width,
      height: CANVAS.height,
      sharedLoader: true,
      sharedTicker: true
    });
    document.body.appendChild(this._app.view);

    this._loadSprites();
  }

  private _update() {
    this._gameController.update();
  }


  private _loadSprites() {
    this._app.loader
      .add('assets/ship.json')
      .add('assets/bg.gif')
      .add('assets/starfield.png')
      .add('assets/missile.png')
      .add('assets/enemy.png')
      .add('assets/explosion.json')
      .load(this._spritesLoaded.bind(this));
  }

  private _spritesLoaded() {
    this._gameController = new Controller(this._app.stage);

    this._app.ticker.add(this._update.bind(this));
  }
}
