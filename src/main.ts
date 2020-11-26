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
      view: canvas as HTMLCanvasElement
    });

    this._loadSprites();
  }

  private _update() {
    if (this._gameController && this._gameController.visible) {
      this._updateGame();
    }
    if (this._mainScreen.visible) {
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
    // this._splashScreen = new SplashScreen(this._app.stage);
    this._mainScreen = new MainScreen(this._app.stage);
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
