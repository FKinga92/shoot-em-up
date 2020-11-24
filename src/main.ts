import { Application } from 'pixi.js';
import Scroller from './background/scroller';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import Ship from './ship';

export default class Main {

  private _app: Application;
  private _scroller: Scroller;
  private _ship: Ship;

  constructor() {
    this._app = new Application({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    });
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
    this._scroller = new Scroller(this._app.stage);
    this._ship = new Ship(this._app);

    document.addEventListener('keydown', (e) => {
      if (e.code.startsWith('Arrow')) {
        this._ship.move(e.code.replace('Arrow', '').toLowerCase());
      }
    });

    this._app.ticker.add(this._update.bind(this));
  }
}
