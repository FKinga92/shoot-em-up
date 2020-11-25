import { Application, TextStyle, Text, Loader } from 'pixi.js';
import { CANVAS } from './constants';
import Scroller from './background/scroller';
import Ship from './ship';
import EnemiesManager from './enemy/enemies-manager';
import Key from './movement/key';
import { Keys } from './movement/keys';

type ControlKey = 'up' | 'down' | 'left' | 'right' | 'shoot';

export default class Main {

  private _app: Application;
  private _keys: { [K in ControlKey]: string };
  private _scroller: Scroller;
  private _ship: Ship;
  private _enemiesManager: EnemiesManager;

  constructor() {
    this._app = new Application({
      width: CANVAS.width,
      height: CANVAS.height
    });
    document.body.appendChild(this._app.view);

    this._keys = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', shoot: 'Space' };
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

  private _createKeys(): Keys {
    const keys = Object.keys(this._keys) as Array<ControlKey>;
    return keys.reduce((acc, key) => {
      acc[key] = new Key(this._keys[key]);
      return acc;
    }, {} as Keys);
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
    const userKeys = this._createKeys();
    this._scroller = new Scroller(this._app.stage);
    this._ship = new Ship(this._app.stage, userKeys);
    this._enemiesManager = new EnemiesManager(this._app.stage);

    const intervalId = setInterval(() => { // TODO clearInterval and event unsubscribe
      this._enemiesManager.addEnemy();
    }, 2000);

    const enemySpawnId = setInterval(() => {
      this._enemiesManager.changeDirection();
    }, 5000);

    this._app.ticker.add(this._update.bind(this));
  }
}
