import { Sprite, Texture } from 'pixi.js';
import SpritesPool from './sprites-pool';

export default class MissileSpritesPool extends SpritesPool {
  protected _createSprites() {
    this._sprites = [];
    for (let i = 0; i < 20; i++) {
      this._sprites.push(new Sprite(Texture.from('assets/missile.png')));
    }
  }
}
