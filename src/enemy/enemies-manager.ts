import { Application } from 'pixi.js';
import Enemy from './enemy';

export default class EnemiesManager {

  private _enemies: Array<Enemy>;
  private _app: Application;

  constructor(app: Application) {
    this._enemies = [];
    this._app = app;
  }

  public addEnemy() {
    this._enemies.push(new Enemy(this._app));
  }

  public update() {
    this._enemies.forEach((enemy => enemy.updatePosition()));
  }

  public changeDirection() {
    this._enemies.forEach(enemy => enemy.changeDirection());
  }
}
