import * as PIXI from 'pixi.js';
import Scroller from './background/scroller';

const app = new PIXI.Application();

document.body.appendChild(app.view);

app.loader
  .add('ship', 'assets/ship.png')
  .add('bg', 'assets/bg.gif')
  .add('starfield', 'assets/starfield.png')
  .load((_, resources) => {
    const ship = new PIXI.Sprite(resources.ship.texture);
    const scroller = new Scroller(app.stage);

    ship.x = 10;
    ship.y = app.renderer.height / 2;
    ship.scale.set(1.5, 1.5);
    app.stage.addChild(ship);

    let delta = 1;
    app.ticker.add(() => {
      delta += 10;
      scroller.moveViewPortXBy(delta);
    });
  });
