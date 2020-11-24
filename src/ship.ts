import { AnimatedSprite, Application, Container, Sprite, Texture } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

export default class Ship extends AnimatedSprite {

  private static SPEED = 10;

  private stage: Container;

  constructor(app: Application) {
    const frames = ['assets/ship/f1.png', 'assets/ship/f2.png', 'assets/ship/f3.png', 'assets/ship/f4.png'];
    const textures = frames.map(url => Texture.from(url));
    super(textures);

    this.x = 10;
    this.y = app.renderer.height / 2 - this.height / 2;
    this.scale.set(1.5, 1.5);
    this.stage = app.stage;
    this.animationSpeed = 0.167;
    this.play();
    this.stage.addChild(this);
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

  public shoot(bullets: Array<any>) {
    const bullet = new Sprite(Texture.from('assets/missile.png')); // TODO: create spritesheet + probably need a different missile img
    bullet.position.x = this.x + this.width;
    bullet.position.y = this.y;
    this.stage.addChild(bullet);
    bullets.push(bullet);
  }

  private _moveUp() {
    if (this.y > Ship.SPEED) {
      this.y -= Ship.SPEED;
    }
  }

  private _moveDown() {
    if (this.y < CANVAS_HEIGHT - this.height - Ship.SPEED) {
      this.y += Ship.SPEED;
    }
  }

  private _moveLeft() {
    if (this.x > Ship.SPEED) {
      this.x -= Ship.SPEED;
    }
  }

  private _moveRight() {
    if (this.x < CANVAS_WIDTH - this.width - Ship.SPEED) {
      this.x += Ship.SPEED;
    }
  }

}
