import { AnimatedSprite, Application, Container, Sprite, Texture } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import MissileSpritesPool from './sprites-pool/missile-sprites-pool';

export default class Ship extends AnimatedSprite {

  private static SPEED = 10;
  private static MISSILE_SPEED = 2;

  private _stage: Container;
  private _missiles: Array<Sprite>;
  private _missileSpritesPool: MissileSpritesPool;

  constructor(app: Application) {
    const frames = ['assets/ship/f1.png', 'assets/ship/f2.png', 'assets/ship/f3.png', 'assets/ship/f4.png'];
    const textures = frames.map(url => Texture.from(url));
    super(textures);

    this.position.x = 10;
    this.position.y = app.renderer.height / 2 - this.height / 2;
    this.scale.set(1.5, 1.5);
    this.animationSpeed = 0.167;
    this.play();
    this._stage = app.stage;
    this._stage.addChild(this);

    this._missileSpritesPool = new MissileSpritesPool();
    this._missiles = [];
  }

  public move(direction: string) {
    switch (direction) {
      case 'up':
        this._moveUp();
        break;
      case 'down':
        this._moveDown();
        break;
      case 'left':
        this._moveLeft();
        break;
      case 'right':
        this._moveRight();
        break;
    }
  }

  public shoot() {
    const missile = this._missileSpritesPool.borrowSprite();
    missile.position.set(this.position.x + this.width, this.position.y);
    this._stage.addChild(missile);
    this._missiles.push(missile);
  }

  public update() {
    this._updateMissiles();
  }

  private _updateMissiles() {
    this._returnMissiles();

    this._missiles.forEach((missile) => {
      missile.position.x += Ship.MISSILE_SPEED;
    });
  }

  private _returnMissiles() {
    this._missiles.forEach((missile, idx) => {
      if (missile.position.x + missile.width > CANVAS_WIDTH) {
        this._stage.removeChild(missile);
        this._missileSpritesPool.returnSprite(missile);
        this._missiles.splice(idx, 1);
      }
    });
  }

  private _moveUp() {
    if (this.position.y > Ship.SPEED) {
      this.position.y -= Ship.SPEED;
    }
  }

  private _moveDown() {
    if (this.position.y < CANVAS_HEIGHT - this.height - Ship.SPEED) {
      this.position.y += Ship.SPEED;
    }
  }

  private _moveLeft() {
    if (this.position.x > Ship.SPEED) {
      this.position.x -= Ship.SPEED;
    }
  }

  private _moveRight() {
    if (this.position.x < CANVAS_WIDTH - this.width - Ship.SPEED) {
      this.position.x += Ship.SPEED;
    }
  }

}
