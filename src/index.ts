import * as PIXI from 'pixi.js';

let app = new PIXI.Application();

document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x061639;

app.loader
  .add('ship', 'assets/ship.png')
  .add('bg', 'assets/bg.gif')
  .add('starfield', 'assets/starfield.png')
  .load((_, resources) => {
    const ship = new PIXI.Sprite(resources.ship.texture);
    const bg = new PIXI.TilingSprite(resources.bg.texture, 800, 600);
    const starfield = new PIXI.TilingSprite(resources.starfield.texture, 800, 600);
    bg.position.set(0, 0);
    bg.tilePosition.set(0, 0);
    app.stage.addChild(bg);
    starfield.position.set(0, 0);
    starfield.tilePosition.set(0, 0);
    app.stage.addChild(starfield);

    ship.x = 10;
    ship.y = app.renderer.height / 2;
    ship.scale.set(1.5, 1.5);
    app.stage.addChild(ship);

    app.ticker.add(() => {
      bg.tilePosition.x -= 0.064;
      starfield.tilePosition.x -= 0.32;
    });
  });
