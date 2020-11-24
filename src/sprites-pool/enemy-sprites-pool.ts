import { Sprite, Texture } from 'pixi.js';
import SpritesPool from './sprites-pool';

export default class EnemySpritesPool extends SpritesPool {

  protected _createSprites() {
    this._sprites = [];
    for (let i = 0; i < 40; i++) {
      this._sprites.push(new Sprite(Texture.from('assets/enemy.png')));
    }
  }
}
