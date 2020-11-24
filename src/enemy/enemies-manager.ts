import { Container } from 'pixi.js';
import EnemySpritesPool from '../sprites-pool/enemy-sprites-pool';
import Enemy from './enemy';

export default class EnemiesManager {

  private _enemies: Array<Enemy>;
  private _spritesPool: EnemySpritesPool;

  constructor(private _stage: Container) {
    this._enemies = [];
    this._spritesPool = new EnemySpritesPool();
  }

  public addEnemy() {
    const enemySprite = this._spritesPool.borrowSprite();
    const enemy = new Enemy(this._stage, enemySprite);
    this._enemies.push(enemy);
  }

  public update() {
    this._returnSprites();
    this._enemies.forEach((enemy => enemy.updatePosition()));
  }

  public changeDirection() {
    this._enemies.forEach(enemy => enemy.changeDirection());
  }

  private _returnSprites() {
    this._enemies.forEach((enemy, idx) => {
      if (enemy.sprite.position.x < 0) {
        this._stage.removeChild(enemy.sprite);
        this._spritesPool.returnSprite(enemy.sprite);
        this._enemies.splice(idx, 1);
      }
    });
  }
}
