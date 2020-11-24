import { AnimatedSprite, Container, Loader, Sprite, Texture } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { getRandomIntBetween } from '../utils';

export default class Enemy {

  public static SPEED_X = 0.1;
  public static SPEED_Y = 0.2;

  private _direction: number;

  constructor(private _stage: Container, private _sprite: Sprite) {
    this._sprite.scale.set(1.5, 1.5);
    this._sprite.position.x = CANVAS_WIDTH - this._sprite.width;
    this._sprite.position.y = getRandomIntBetween(CANVAS_HEIGHT - this._sprite.height);
    _stage.addChild(this._sprite);
    this._direction = (getRandomIntBetween(10) % 2 === 0) ? -1 : 1;
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

  public destroy() {
    const frames = ['expl1.png', 'expl2.png', 'expl3.png', 'expl4.png', 'expl5.png', 'expl6.png'];
    const textures = frames.map(url => Texture.from(url));
    this._stage.removeChild(this._sprite);
    const sprite = new AnimatedSprite(textures);
    sprite.position.set(this.sprite.position.x, this.sprite.position.y);
    sprite.scale.set(0.5, 0.5);
    sprite.animationSpeed = 0.2;
    sprite.play();
    this._stage.addChild(sprite);
    setTimeout(() => {
      this._stage.removeChild(sprite);
    }, 500);
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
    const maxYPos = CANVAS_HEIGHT - this._sprite.height;
    if (this._sprite.position.y <= 0) {
      this._sprite.position.y = 0;
      wallHit = true;
    }

    if (this._sprite.position.y >= maxYPos) {
      this._sprite.position.y = maxYPos;
      wallHit = true;
    }

    return wallHit;
  }
}
