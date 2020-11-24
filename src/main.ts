import { Application } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import Scroller from './background/scroller';
import Ship from './ship';
import Enemy from './enemy';

export default class Main {

  private _app: Application;
  private _scroller: Scroller;
  private _ship: Ship;
  private _enemies: Array<Enemy>;

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
    this._ship.update();
    this._enemies.forEach(enemy => enemy.updatePosition());
  }

  private _loadSprites() {
    // TODO spritesheet
    const shipFrames = ['assets/ship/f1.png', 'assets/ship/f2.png', 'assets/ship/f3.png', 'assets/ship/f4.png'];
    this._app.loader
      .add(shipFrames)
      .add('assets/bg.gif')
      .add('assets/starfield.png')
      .add('assets/missile.png')
      .add('assets/enemy.png')
      .load(this._spritesLoaded.bind(this));
  }

  private _spritesLoaded() {
    this._scroller = new Scroller(this._app.stage);
    this._ship = new Ship(this._app);
    this._enemies = [];

    let numOfEnemies = 0;
    const intervalId = setInterval(() => {
      if (numOfEnemies < 20) {
        this._enemies.push(new Enemy(this._app));
        numOfEnemies++;
      }
    }, 2000);

    setInterval(() => {
      this._enemies.forEach(enemy => enemy.changeDirection());
    }, 5000);

    document.addEventListener('keydown', (e) => {
      if (e.code.startsWith('Arrow')) {
        this._ship.move(e.code.replace('Arrow', '').toLowerCase());
      }
      if (e.code === 'Space') {
        this._ship.shoot();
      }
    });

    this._app.ticker.add(this._update.bind(this));
  }
}
