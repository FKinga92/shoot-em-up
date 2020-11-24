import { TilingSprite, Texture } from 'pixi.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';

export default class BGLayer extends TilingSprite {

  private _viewportX: number;
  private _deltaX: number;

  constructor(imgUrl: string, deltaX: number) {
    const texture = Texture.from(imgUrl);
    super(texture, CANVAS_WIDTH, CANVAS_HEIGHT);

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
