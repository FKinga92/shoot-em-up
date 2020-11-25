import { Application, TextStyle, Text, Loader, Sprite, AnimatedSprite } from 'pixi.js';
import { CANVAS } from './constants';
import Scroller from './background/scroller';
import Ship from './ship';
import EnemiesManager from './enemy/enemies-manager';
import { Key, ControlKey, Keys } from './movement';

export default class Main {

  private _app: Application;
  private _keys: { [K in ControlKey]: string };
  private _scroller: Scroller;
  private _ship: Ship;
  private _enemiesManager: EnemiesManager;
  private _enemySpawnId: NodeJS.Timeout;
  private _enemyDirChangeId: NodeJS.Timeout;

  constructor() {
    this._app = new Application({
      width: CANVAS.width,
      height: CANVAS.height,
      sharedLoader: true,
      sharedTicker: true
    });
    document.body.appendChild(this._app.view);

    this._keys = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', shoot: 'Space' };
    this._loadSprites();
  }

  private _update() {
    if (!this._ship) {
      return;
    }
    this._scroller.moveViewPortXBy(1); // TODO
    this._enemiesManager.update();
    this._ship.update();
    this._checkForCollision();
    this._checkForEnemyHit();
  }

  private _checkForCollision() {
    const shipHit = this._enemiesManager.checkForCollision(this._ship);
    if (shipHit) { // TODO navigate to main page
      this._destroySprite(this._ship, true);
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

  private _destroySprite(destroyedSprite: Sprite, gameOver = false) {
    const explosion = this._createExplosionOf(destroyedSprite);
    this._app.stage.addChild(explosion);
    if (gameOver) {
      this._stopGame();
      destroyedSprite.destroy();
    } else {
      this._app.stage.removeChild(destroyedSprite);
    }
    setTimeout(() => {
      this._app.stage.removeChild(explosion);
    }, 500);
  }

  private _createExplosionOf(destroyedSprite: Sprite): Sprite {
    const sheet = Loader.shared.resources['assets/explosion.json'].spritesheet;
    const sprite = new AnimatedSprite(sheet.animations.expl);
    sprite.position.set(destroyedSprite.position.x, destroyedSprite.position.y);
    sprite.scale.set(0.5, 0.5);
    sprite.animationSpeed = 0.2;
    sprite.play();
    return sprite;
  }

  private _stopGame() {
    this._ship.onDestroy();
    this._ship = null;
    clearInterval(this._enemySpawnId);
    clearInterval(this._enemyDirChangeId);
  }

  private _checkForEnemyHit() {
    if (this._ship) {
      const destroyedEnemies = this._enemiesManager.checkForHit(this._ship);
      destroyedEnemies.forEach(enemy => this._destroySprite(enemy));
    }
  }

  private _createKeys(): Keys {
    const keys = Object.keys(this._keys) as Array<ControlKey>;
    return keys.reduce((acc, key) => {
      acc[key] = new Key(this._keys[key]);
      return acc;
    }, {} as Keys);
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
    const userKeys = this._createKeys();
    this._scroller = new Scroller(this._app.stage);
    this._ship = new Ship(this._app.stage, userKeys);
    this._enemiesManager = new EnemiesManager(this._app.stage);

    this._enemySpawnId = setInterval(() => {
      this._enemiesManager.addEnemy();
    }, 2000);

    this._enemyDirChangeId = setInterval(() => {
      this._enemiesManager.changeDirection();
    }, 5000);

    this._app.ticker.add(this._update.bind(this));
  }
}
