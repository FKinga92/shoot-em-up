import { Sprite, Texture } from 'pixi.js';
import SpritesPool from './sprites-pool';

export default class MissileSpritesPool extends SpritesPool {
  protected _createSprites() {
    this._sprites = [];
    for (let i = 0; i < 10; i++) {
      const missile = new Sprite(Texture.from('assets/missile.png'));
      this._sprites.push(missile);
    }
  }
}
