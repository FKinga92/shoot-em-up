import { Sprite } from 'pixi.js';

export const getRandomIntBetween = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Implementation by kittykatattack (https://github.com/kittykatattack/learningPixi#the-hittestrectangle-function)
// slightly modified, so that it won't add additional properties to the tested sprites
export const spritesCollided = (r1: Partial<Sprite>, r2: Partial<Sprite>): boolean => {

  // tslint:disable-next-line: one-variable-per-declaration
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  hit = false;
  const rect1 = { centerX: 0, centerY: 0, halfWidth: 0, halfHeight: 0 };
  const rect2 = { centerX: 0, centerY: 0, halfWidth: 0, halfHeight: 0 };

  rect1.centerX = r1.x + r1.width / 2;
  rect1.centerY = r1.y + r1.height / 2;
  rect2.centerX = r2.x + r2.width / 2;
  rect2.centerY = r2.y + r2.height / 2;

  rect1.halfWidth = r1.width / 2;
  rect1.halfHeight = r1.height / 2;
  rect2.halfWidth = r2.width / 2;
  rect2.halfHeight = r2.height / 2;

  vx = rect1.centerX - rect2.centerX;
  vy = rect1.centerY - rect2.centerY;

  combinedHalfWidths = rect1.halfWidth + rect2.halfWidth;
  combinedHalfHeights = rect1.halfHeight + rect2.halfHeight;

  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }

  return hit;
};
