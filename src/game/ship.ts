import { AnimatedSprite, Container, Loader, Sprite } from 'pixi.js';
import { CANVAS } from '../constants';
import { ControlKey, Keys } from './movement';
import MissileSpritesPool from './sprites-pool/missile-sprites-pool';

export default class Ship extends AnimatedSprite {

  private static SPEED = 1;
  private static MISSILE_SPEED = 1;

  private _stage: Container;
  private _missileSpritesPool: MissileSpritesPool;
  private _vx: number;
  private _vy: number;
  private _maxX: number;
  private _maxY: number;
  private _keys: Keys;

  public readonly missiles: Array<Sprite>;

  constructor(stage: Container, keys: Keys) {
    const sheet = Loader.shared.resources['assets/ship.json'].spritesheet;
    super(sheet.animations.f);

    this._stage = stage;
    this._keys = keys;
    this._missileSpritesPool = new MissileSpritesPool();
    this.missiles = [];

    this.position.x = 10;
    this.scale.set(1.5, 1.5);
    this.position.y = CANVAS.height / 2 - this.height / 2;
    this._vx = 0;
    this._vy = 0;
    this._maxX = CANVAS.width - this.width - CANVAS.padding;
    this._maxY = CANVAS.height - this.height - CANVAS.padding;
    this.animationSpeed = 0.167;
    this.play();
    this._stage.addChild(this);

    this._attachHandlers();
  }

  public shoot() {
    const missile = this._missileSpritesPool.borrowSprite();
    if (missile) {
      missile.position.set(this.position.x + this.width, this.position.y);
      this._stage.addChild(missile);
      this.missiles.push(missile);
    } else {
      // could dinamically increase pool size here
      console.log('Out of missiles.');
    }
  }

  public hitEnemy(missile: Sprite, idx: number) {
    this._returnMissile(missile, idx);
  }

  public update() {
    this.position.x += this._vx;
    this.position.y += this._vy;
    this._containWithinGameArea();
    this._updateMissiles();
  }

  public onDestroy() {
    const keys = Object.keys(this._keys) as Array<ControlKey>;
    keys.forEach((key) => {
      this._keys[key].onDestroy();
    });
  }

  private _containWithinGameArea() {
    if (this.position.x < 0) { this.position.x = 0; }
    if (this.position.x > this._maxX) { this.position.x = this._maxX; }
    if (this.position.y < CANVAS.padding) { this.position.y = 0 + CANVAS.padding; }
    if (this.position.y > this._maxY) { this.position.y = this._maxY; }
  }

  private _updateMissiles() {
    this._returnMissiles();

    this.missiles.forEach((missile) => {
      missile.position.x += Ship.MISSILE_SPEED;
    });
  }

  private _returnMissile(missile: Sprite, idx: number) {
    this._stage.removeChild(missile);
    this._missileSpritesPool.returnSprite(missile);
    this.missiles.splice(idx, 1);
  }

  private _returnMissiles() {
    this.missiles.forEach((missile, idx) => {
      if (missile.position.x + missile.width > CANVAS.width) {
        this._returnMissile(missile, idx);
      }
    });
  }

  private _attachHandlers() {
    const left = this._keys.left;
    const right = this._keys.right;
    const up = this._keys.up;
    const down = this._keys.down;

    left.onPress = this._moveLeft.bind(this);
    left.onRelease = () => {
      if (!right.isDown && this._vy === 0) { this._vx = 0; }
    };
    right.onPress = this._moveRight.bind(this);
    right.onRelease = () => {
      if (!left.isDown && this._vy === 0) { this._vx = 0; }
    };
    up.onPress = this._moveUp.bind(this);
    up.onRelease = () => {
      if (!down.isDown && this._vx === 0) { this._vy = 0; }
    };
    down.onPress = this._moveDown.bind(this);
    down.onRelease = () => {
      if (!up.isDown && this._vx === 0) { this._vy = 0; }
    };

    this._keys.shoot.onRelease = this.shoot.bind(this);
  }

  private _moveUp() {
    this._vy = - Ship.SPEED;
    this._vx = 0;
  }

  private _moveDown() {
    this._vy = Ship.SPEED;
    this._vx = 0;
  }

  private _moveLeft() {
    this._vx = - Ship.SPEED;
    this._vy = 0;
  }

  private _moveRight() {
    this._vx = Ship.SPEED;
    this._vy = 0;
  }

}
