import { Easing, Tween, update as updateTween } from '@tweenjs/tween.js';
import { Application } from 'pixi.js';
import { CANVAS } from './constants';
import Controller from './game/controller';
import MainScreen from './main-screen/main-screen';
import SplashScreen from './splash-screen/splash-container';

export default class Main {

  private _app: Application;
  private _gameController: Controller;
  private _splashScreen: SplashScreen;
  private _mainScreen: MainScreen;

  constructor() {
    const canvas = document.getElementById('game-canvas');
    this._app = new Application({
      width: CANVAS.width,
      height: CANVAS.height,
      sharedLoader: true,
      sharedTicker: true,
      view: canvas as HTMLCanvasElement,
      transparent: true
    });

    this._loadSprites();
  }

  private _update() {
    if (this._splashScreen.visible || this._mainScreen.alpha < 1) {
      updateTween();
      if (this._splashScreen.visible && this._splashScreen.alpha <= 0) {
        this._splashScreen.visible = false;
        this._mainScreen.visible = true;
      }
    }
    if (this._gameController && this._gameController.visible) {
      this._updateGame();
    }
    if (this._mainScreen.visible && this._mainScreen.alpha === 1) {
      this._mainScreen.update();
    }
  }

  private _startGame() {
    this._gameController = new Controller(this._app.stage);
    this._mainScreen.visible = false;
  }

  private _updateGame() {
    if (this._gameController.isStopped) {
      this._stopGame();
    } else {
      this._gameController.update();
    }
  }

  private _stopGame() {
    this._gameController.visible = false;
    this._mainScreen.visible = true;
  }


  private _loadSprites() {
    this._app.loader
      .add('assets/splash-bg.jpg')
      .add('assets/title.png')
      .add('assets/splash-logo.png')
      .add('assets/btn.png')
      .add('assets/ship.json')
      .add('assets/bg.gif')
      .add('assets/starfield.png')
      .add('assets/missile.png')
      .add('assets/enemy.png')
      .add('assets/explosion.json')
      .load(this._spritesLoaded.bind(this));
  }

  private _spritesLoaded() {
    this._mainScreen = new MainScreen(this._app.stage);
    this._mainScreen.alpha = 0;
    this._splashScreen = new SplashScreen(this._app.stage);
    const splashInitOpacity = { opacity: 1 };
    const mainInitOpacity = { opacity: 0 };
    const splashOut = new Tween(splashInitOpacity)
      .to({ opacity: 0 }, 2000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => this._splashScreen.alpha = splashInitOpacity.opacity)
      .delay(2000)
      .start();
    const mainIn = new Tween(mainInitOpacity)
      .to({ opacity: 1 }, 1000)
      .easing(Easing.Quadratic.In)
      .onUpdate(() => this._mainScreen.alpha = mainInitOpacity.opacity)
      .delay(4000)
      .start();

    this._mainScreen.buttons.forEach((btn) => {
      if (btn.text.toLowerCase().startsWith('game')) {
        btn.on('click', this._startGame.bind(this));
      } else {
        btn.on('click', () => window.location.assign('https://giphy.com/explore/random-cat'));
      }
    });

    this._app.ticker.add(this._update.bind(this));
  }
}
