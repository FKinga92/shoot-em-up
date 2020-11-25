import { Container, Sprite, Texture } from 'pixi.js';
import { CANVAS } from '../constants';

export default class SplashScreen extends Container {
  constructor(private _stage: Container) {
    super();
    this._stage.addChild(this);

    const background = new Sprite(Texture.from('assets/splash-bg.jpg'));
    background.position.set(0, 0);
    this.addChild(background);
    const logo = new Sprite(Texture.from('assets/splash-logo.png'));
    logo.anchor.set(0.5, 0.5);
    logo.position.set(CANVAS.width / 2, CANVAS.height / 2);
    this.addChild(logo);
  }
}

