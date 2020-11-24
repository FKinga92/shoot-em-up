import { Container } from 'pixi.js';
import Enemy from './enemy';

export default class EnemiesManager {

  private _enemies: Array<Enemy>;

  constructor(private _stage: Container) {
    this._enemies = [];
  }

  public addEnemy() {
    this._enemies.push(new Enemy(this._stage));
  }

  public update() {
    this._enemies.forEach((enemy => enemy.updatePosition()));
  }

  public changeDirection() {
    this._enemies.forEach(enemy => enemy.changeDirection());
  }
}
