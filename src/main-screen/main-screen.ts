import { Container, Graphics, Sprite, Text, TextStyle, Texture } from 'pixi.js';
import { CANVAS } from '../constants';
import Scroller from '../background/scroller';

export default class MainScreen extends Container {

  private _scroller: Scroller;
  private _buttons: Array<Text>;
  private _logo: Sprite;

  constructor(private _stage: Container) {
    super();
    this._stage.addChild(this);

    this._scroller = new Scroller(this);
    this._logo = new Sprite(Texture.from('assets/splash-logo.png'));
    const logoY = this._logo.height / 2 + CANVAS.padding * 3;
    this._logo.position.set(CANVAS.width / 2, logoY);
    this._logo.anchor.set(0.5, 0.5);
    this.addChild(this._logo);

    this._buttons = ['Game 1', 'Game 2', 'Game 3', 'Exit']
      .map((text, idx) => this._createButton(text, CANVAS.width / 2, logoY + this._logo.height + (80 * idx + 1)));
  }

  public update() {
    this._scroller.moveViewPortXBy();
    this._logo.rotation += 0.001;
  }

  public get buttons(): Array<Text> {
    return this._buttons;
  }

  private _createButton(text: string, x: number, y: number): Text {
    const style = new TextStyle({
      fontFamily: 'Futura',
      fontSize: 32,
      fontWeight: 'bold',
      fill: 'white',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowDistance: 6,
      padding: 10
    });

    const btn = new Text(text.toUpperCase(), style);
    const rect = new Sprite(Texture.from('assets/btn.png'));
    rect.anchor.set(0.5, 0.5);
    rect.scale.set(1.2, 1.2);
    rect.position.set(x, y);

    btn.interactive = true;
    btn.buttonMode = true;
    btn.anchor.set(0.5, 0.5);
    btn.position.set(x, y);

    this.addChild(rect);
    this.addChild(btn);
    return btn;
  }
}

