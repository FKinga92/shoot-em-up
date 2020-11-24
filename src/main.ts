import { Application } from 'pixi.js';
import Scroller from './background/scroller';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import Ship from './ship';

export default class Main {

  private _app: Application;
  private _scroller: Scroller;
  private _ship: Ship;

  private bullets: Array<any>;
  private bulletSpeed: number;

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

    // TODO move this to another class
    for (let b = this.bullets.length - 1; b >= 0; b--) {
      this.bullets[b].position.x += this.bulletSpeed;
    }
  }

  private _loadSprites() {
    const shipFrames = ['assets/ship/f1.png', 'assets/ship/f2.png', 'assets/ship/f3.png', 'assets/ship/f4.png'];
    this._app.loader
      .add(shipFrames)
      .add('assets/bg.gif')
      .add('assets/starfield.png')
      .add('assets/missile.png')
      .load(this._spritesLoaded.bind(this));
  }

  private _spritesLoaded() {
    this._scroller = new Scroller(this._app.stage);
    this._ship = new Ship(this._app);
    this.bullets = [];
    this.bulletSpeed = 5;

    document.addEventListener('keydown', (e) => {
      if (e.code.startsWith('Arrow')) {
        this._ship.move(e.code.replace('Arrow', '').toLowerCase());
      }
      if (e.code === 'Space') {
        this._ship.shoot(this.bullets);
      }
    });

    this._app.ticker.add(this._update.bind(this));
  }
}
