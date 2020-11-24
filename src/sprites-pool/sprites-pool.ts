import { Sprite } from 'pixi.js';

export default abstract class SpritesPool {

  protected _sprites: Array<Sprite>;

  constructor() {
    this._createSprites();
  }

  protected abstract _createSprites(): void;

  public borrowSprite() {
    return this._sprites.shift();
  }

  public returnSprite(sprite: Sprite) {
    this._sprites.push(sprite);
  }
}
