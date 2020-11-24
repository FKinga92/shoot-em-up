import { Application, Sprite, Texture } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';

export default class Enemy extends Sprite {

  public static SPEED = 0.2;

  private _direction: number;

  constructor(app: Application) {
    const texture = Texture.from('assets/enemy.png');
    super(texture);
    this.scale.set(1.5, 1.5);
    this.position.x = CANVAS_WIDTH - this.width;
    this.position.y = this._randomInt(CANVAS_HEIGHT - this.height);
    app.stage.addChild(this);
    this._direction = (this._randomInt(10) % 2 === 0) ? -1 : 1;
  }

  public updatePosition() {
    this._move();
  }

  public changeDirection() {
    if (this._randomInt(10) % 2 === 0) {
      this._changeDirection();
    }
  }

  private _changeDirection() {
    this._direction *= -1;
  }

  private _move() {
    this.position.y += (this._direction * Enemy.SPEED * this._randomInt(5));
    if (this._hitsWall()) {
      this._changeDirection();
    }
    this.position.x -= (0.1 * this._randomInt(5));
  }

  private _hitsWall(): boolean {
    return this.position.y <= 0 || this.position.y >= CANVAS_HEIGHT - this.height;
  }

  private _randomInt(max: number, min = 0): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
