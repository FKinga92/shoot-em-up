import { Container, Sprite } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { getRandomIntBetween } from '../utils';

export default class Enemy {

  public static SPEED = 0.2;

  private _direction: number;
  public readonly sprite: Sprite;

  constructor(stage: Container, sprite: Sprite) {
    this.sprite = sprite;
    this.sprite.scale.set(1.5, 1.5);
    this.sprite.position.x = CANVAS_WIDTH - this.sprite.width;
    this.sprite.position.y = getRandomIntBetween(CANVAS_HEIGHT - this.sprite.height);
    stage.addChild(this.sprite);
    this._direction = (getRandomIntBetween(10) % 2 === 0) ? -1 : 1;
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
    this.sprite.position.y += (this._direction * Enemy.SPEED * getRandomIntBetween(5));
    if (this._containedWithinCanvas()) {
      this._changeDirection();
    }
    this.sprite.position.x -= (0.1 * getRandomIntBetween(5));
  }

  private _containedWithinCanvas() {
    let wallHit = false;
    const maxYPos = CANVAS_HEIGHT - this.sprite.height;
    if (this.sprite.position.y <= 0) {
      this.sprite.position.y = 0;
      wallHit = true;
    }

    if (this.sprite.position.y >= maxYPos) {
      this.sprite.position.y = maxYPos;
      wallHit = true;
    }

    return wallHit;
  }
}
