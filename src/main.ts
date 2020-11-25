import { Application, TextStyle, Text, Loader } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import Scroller from './background/scroller';
import Ship from './ship';
import EnemiesManager from './enemy/enemies-manager';

export default class Main {

  private _app: Application;
  private _scroller: Scroller;
  private _ship: Ship;
  private _enemiesManager: EnemiesManager;

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
    this._enemiesManager.update();
    this._checkForCollision();
    this._checkForEnemyHit();
  }

  private _checkForCollision() {
    const shipHit = this._enemiesManager.checkForCollision(this._ship);
    if (shipHit) { // TODO navigate to main page
      const style = new TextStyle({
        fontFamily: 'Futura',
        fontSize: 64,
        fill: 'white'
      });
      const message = new Text('SHIP HIT', style);
      message.x = 120;
      message.y = this._app.stage.height / 2 - 32;
      this._app.stage.addChild(message);
    }
  }

  private _checkForEnemyHit() {
    this._enemiesManager.checkForHit(this._ship);
  }

  private _loadSprites() {
    Loader.shared
      .add('assets/ship.json')
      .add('assets/bg.gif')
      .add('assets/starfield.png')
      .add('assets/missile.png')
      .add('assets/enemy.png')
      .add('assets/explosion.json')
      .load(this._spritesLoaded.bind(this));
  }

  private _spritesLoaded() {
    this._scroller = new Scroller(this._app.stage);
    this._ship = new Ship(this._app);
    this._enemiesManager = new EnemiesManager(this._app.stage);

    const intervalId = setInterval(() => { // TODO
      this._enemiesManager.addEnemy();
    }, 2000);

    const enemySpawnId = setInterval(() => {
      this._enemiesManager.changeDirection();
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
