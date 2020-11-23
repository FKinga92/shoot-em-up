import { Container } from 'pixi.js';
import BGLayer from './bg-layer';

export default class Scroller {

  private _viewportX: number;
  private _farback: BGLayer;
  private _starfield: BGLayer;

  constructor(stage: Container) {
    this._farback = new BGLayer('assets/bg.gif', 0.064);
    this._starfield = new BGLayer('assets/starfield.png', 0.32);
    stage.addChild(this._farback);
    stage.addChild(this._starfield);
    this._viewportX = 0;
  }

  public get viewportX(): number {
    return this._viewportX;
  }
  public set viewportX(viewportX: number) {
    this._viewportX = viewportX;
    this._farback.setViewportX(viewportX);
    this._starfield.setViewportX(viewportX);
  }

  public moveViewPortXBy(value: number) {
    // this.viewportX = this._viewportX + value;
    this.viewportX = value;
  }
}
