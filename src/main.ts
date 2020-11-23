import { Application, Sprite } from 'pixi.js';
import Scroller from './background/scroller';

export default class Main {

  private _app: Application;
  private _scroller: Scroller;

  constructor() {
    this._app = new Application();
    document.body.appendChild(this._app.view);

    this._loadSprites();
  }

  private _update() {
    this._scroller.moveViewPortXBy(1); // TODO
  }

  private _loadSprites() {
    this._app.loader
      .add('ship', 'assets/ship.png')
      .add('bg', 'assets/bg.gif')
      .add('starfield', 'assets/starfield.png')
      .load(this._spritesLoaded.bind(this));
  }

  private _spritesLoaded() {
    const ship = new Sprite(this._app.loader.resources.ship.texture);
    this._scroller = new Scroller(this._app.stage);

    ship.x = 10;
    ship.y = this._app.renderer.height / 2;
    ship.scale.set(1.5, 1.5);
    this._app.stage.addChild(ship);

    this._app.ticker.add(this._update.bind(this));
  }
}
