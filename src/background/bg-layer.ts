import * as PIXI from 'pixi.js';

export default class BGLayer extends PIXI.TilingSprite {

  private _viewportX: number;
  private _deltaX: number;

  constructor(imgUrl: string, deltaX: number) {
    const texture = PIXI.Texture.from(imgUrl);
    super(texture, 800, 600);

    this.position.set(0, 0);
    this.tilePosition.set(0, 0);
    this._viewportX = 0;
    this._deltaX = deltaX;
  }

  public setViewportX(viewportX: number) {
    const distance = viewportX - this._viewportX;
    this._viewportX = viewportX;
    this.tilePosition.x -= (distance * this._deltaX);
  }
}
