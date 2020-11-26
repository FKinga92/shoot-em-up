import { Container, Sprite } from 'pixi.js';
import { CANVAS } from '../../constants';
import { getRandomIntBetween } from '../utils';

export default class Enemy {

  public static SPEED_X = 0.3;
  public static SPEED_Y = 1;

  private _direction: number;
  private _maxY: number;

  constructor(private _stage: Container, private _sprite: Sprite) {
    this._sprite.scale.set(1.5, 1.5);
    this._sprite.position.x = CANVAS.width - this._sprite.width;
    this._sprite.position.y = getRandomIntBetween(CANVAS.height - CANVAS.padding - this._sprite.height);
    this._stage.addChild(this._sprite);
    this._direction = (getRandomIntBetween(10) % 2 === 0) ? -1 : 1;
    this._maxY = CANVAS.height - CANVAS.padding - this._sprite.height;
  }
  public get sprite() {
    return this._sprite;
  }

  public updatePosition() {
    this._move();
  }

  public changeDirection() {
    if (getRandomIntBetween(10) % 2 === 0) {
      this._changeDirection();
    }
  }

  private _changeDirection() {
    this._direction *= -1;
  }

  private _move() {
    this._sprite.position.y += (this._direction * Enemy.SPEED_Y * getRandomIntBetween(5));
    if (this._containedWithinCanvas()) {
      this._changeDirection();
    }
    this._sprite.position.x -= (Enemy.SPEED_X * getRandomIntBetween(5));
  }

  private _containedWithinCanvas() {
    let wallHit = false;
    if (this._sprite.position.y <= 0) {
      this._sprite.position.y = 0;
      wallHit = true;
    }

    if (this._sprite.position.y >= this._maxY) {
      this._sprite.position.y = this._maxY;
      wallHit = true;
    }

    return wallHit;
  }
}
