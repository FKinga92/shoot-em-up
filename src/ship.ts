import { Application, Sprite, Texture } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

type Direction = 'up' | 'down' | 'left' | 'right';

export default class Ship extends Sprite {

  constructor(app: Application) {
    const texture = Texture.from('assets/ship.png');
    super(texture);

    this.x = 10;
    this.y = app.renderer.height / 2 - this.height / 2;
    this.scale.set(1.5, 1.5);
    app.stage.addChild(this);
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

  private _moveUp() {
    if (this.y > 5) {
      this.y -= 5;
    }
  }

  private _moveDown() {
    if (this.y < CANVAS_HEIGHT - this.height) {
      this.y += 5;
    }
  }

  private _moveLeft() {
    if (this.x > 5) {
      this.x -= 5;
    }
  }

  private _moveRight() {
    if (this.x < CANVAS_WIDTH - this.width) {
      this.x += 5;
    }
  }

}
