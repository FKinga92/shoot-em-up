import { AnimatedSprite, Container, Loader, Sprite, TextStyle, Text } from 'pixi.js';
import { CANVAS } from '../constants';
import Scroller from '../background/scroller';
import EnemiesManager from './enemy/enemies-manager';
import { ControlKey, Key, Keys } from './movement';
import Ship from './ship';

export default class Controller extends Container {

  private _keys: { [K in ControlKey]: string };
  private _scroller: Scroller;
  private _ship: Ship;
  private _enemiesManager: EnemiesManager;
  private _enemySpawnId: NodeJS.Timeout;
  private _enemyDirChangeId: NodeJS.Timeout;
  private _isStopped = false;

  constructor(private _stage: Container) {
    super();
    this._stage.addChild(this);

    this._keys = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', shoot: 'Space' };
    const userKeys = this._createKeys();
    this._scroller = new Scroller(this);
    this._ship = new Ship(this, userKeys);
    this._enemiesManager = new EnemiesManager(this);

    this._enemySpawnId = setInterval(() => {
      this._enemiesManager.addEnemy();
    }, 2000);

    this._enemyDirChangeId = setInterval(() => {
      this._enemiesManager.changeDirection();
    }, 5000);
  }

  public get isStopped(): boolean {
    return this._isStopped;
  }

  public update() {
    if (!this._ship) {
      return;
    }
    this._scroller.moveViewPortXBy();
    this._enemiesManager.update();
    this._ship.update();
    this._checkForCollision();
    this._checkForEnemyHit();
  }

  private _checkForCollision() {
    const shipHit = this._enemiesManager.checkForCollision(this._ship);
    if (shipHit) {
      this._destroySprite(this._ship, true);
      const style = new TextStyle({
        fontFamily: 'Futura',
        fontSize: 64,
        fill: 'white'
      });
      const message = new Text('GAME OVER', style);
      message.x = CANVAS.width / 2 - message.width / 2;
      message.y = CANVAS.height / 2 - message.height;
      this.addChild(message);
    }
  }

  private _destroySprite(destroyedSprite: Sprite, gameOver = false) {
    const explosion = this._createExplosionOf(destroyedSprite);
    this.addChild(explosion);
    if (gameOver) {
      this._stopGame();
      destroyedSprite.destroy();
    } else {
      this.removeChild(destroyedSprite);
    }
    setTimeout(() => {
      this.removeChild(explosion);
      if (gameOver) { this._isStopped = true; }
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
}
