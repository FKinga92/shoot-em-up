import { Container } from 'pixi.js';
import Ship from '../ship';
import EnemySpritesPool from '../sprites-pool/enemy-sprites-pool';
import Enemy from './enemy';
import { spritesCollided } from '../utils';

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

  public checkForCollision(ship: Ship): boolean {
    return this._enemies.some((enemy) => spritesCollided(ship, enemy.sprite));
  }

  public checkForHit(ship: Ship) {
    ship.missiles.forEach((missile, missilIdx) => {
      this._enemies.forEach((enemy, idx) => {
        if (spritesCollided(missile, enemy.sprite)) {
          ship.hitEnemy(missile, missilIdx);
          this._destoryEnemy(enemy, idx);
        }
      });
    });
  }

  private _destoryEnemy(enemy: Enemy, idx: number) {
    enemy.destroy();
    this._returnSprite(enemy, idx);
  }

  private _returnSprite(enemy: Enemy, idx: number) {
    this._spritesPool.returnSprite(enemy.sprite);
    this._enemies.splice(idx, 1);
  }

  private _returnSprites() {
    this._enemies.forEach((enemy, idx) => {
      if (enemy.sprite.position.x < 0) {
        this._stage.removeChild(enemy.sprite);
        this._returnSprite(enemy, idx);
      }
    });
  }
}
