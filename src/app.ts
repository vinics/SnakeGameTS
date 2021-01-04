// Presentantion
// Input
// Network
// Game logic

import AnimationClock from './engine/AnimationClock';
import Engine from './engine/Engine'

import GameObject from './engine/GameObject';
import Point from './engine/geometry/Point';

// Define Canvas
const game = new Engine(<HTMLCanvasElement>document.getElementById('board1'))

// Set size
game.width = 400;
game.height = 400; 

// Game state
const gameState: {tileSize: number, run: boolean, fruits: Fruit[]} = {
  tileSize: 40,
  run: true,
  fruits: []
}

// Snake
class Snake extends GameObject {
  public direction: { h: number, v: number };

  public fruits: number;

  public trail: Point[];

  constructor() {
    super();

    this.direction = {h: 0, v: 0}
    this.fruits = 0;
    this.trail = [];

    this.animation = new AnimationClock(500);
    this.animation.subscribe(() => {
      this.position.x += this.direction.h * gameState.tileSize;
      this.position.y += this.direction.v * gameState.tileSize;
    })
  }

  public render() {
    game.draw.rect(this.position, {x: gameState.tileSize, y: gameState.tileSize}, {fillColor: 'yellow', strokeColor:'black', strokeWidth: 3})

    this.trail.forEach(el => {
            game.draw.rect({x: el.x, y: el.y}, {x: gameState.tileSize, y: gameState.tileSize}, {fillColor: 'yellow', strokeColor:'black', strokeWidth: 3})
          })
  }
}

const snake = new Snake();
snake.position = { x: 200, y: 200 }

// Fruit
class Fruit extends GameObject {
  constructor(...blocked: Point[]) {
    super();

    let newPosition = this.getFruit();

    while (blocked.includes(newPosition)){
      newPosition = this.getFruit();
    }

    this.position = newPosition;
  }

  getFruit(): Point {

    const rndX = Math.floor(Math.random() * (game.width / gameState.tileSize - 1)) * gameState.tileSize;
    const rndY = Math.floor(Math.random() * (game.height / gameState.tileSize - 1)) * gameState.tileSize;

    const fruit = new Point( rndX, rndY);

    return fruit;
  }

  render() {
    const { x, y } = this.position;

    game.draw.rect({ x: x, y: y }, { x: gameState.tileSize, y: gameState.tileSize }, { fillColor: 'red', strokeWidth: 0 })
  }
}

// Game Input
function gameInput(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowRight':
      if (snake.trail.length == 0 || snake.direction.h !== -1)
      {
        snake.direction.h = 1
        snake.direction.v = 0
      }
      break;

    case 'ArrowLeft':
      if (snake.trail.length == 0 || snake.direction.h !== 1)
      {
        snake.direction.h = -1
        snake.direction.v = 0
      }
      break;

    case 'ArrowUp':
      if (snake.trail.length == 0 || snake.direction.v !== 1)
      {
        snake.direction.h = 0
        snake.direction.v = -1
      }
      break;

    case 'ArrowDown':
      if (snake.trail.length == 0 || snake.direction.v !== -1)
      {
        snake.direction.h = 0
        snake.direction.v = 1
      }
      break;
  }  
}

game.input.keyDown(gameInput);

// Game logic
function logic(timeStamp: DOMHighResTimeStamp){
  // If no fruit, add fruit
  if (gameState.fruits.length == 0) {
    gameState.fruits.push(new Fruit(snake.position, ...snake.trail))
  }

  // Snake run
  snake.animation?.start(timeStamp);
}

// Game render
function render(){

  // BG
  game.draw.rect({x: 0, y: 0}, {x: game.width, y: game.height}, {fillColor: 'black'});

  // Snake
  snake.render();

  // Fruits
  gameState.fruits.forEach(fruit => fruit.render());
}

game.loop.subscribe(logic);
game.loop.subscribe(render);

game.run();

console.dir(snake);

// -----------------------------------------------------------------------------------------------------------

// // Snake
// interface ISnake {
//   position: { x: number, y: number };
//   direction: { h: number, v: number };
//   fruits: number;
//   trail: Array<{ x: number, y: number }>
//   render: () => void;
// }

// const snake: ISnake = {
//   position: {
//     x: 200,
//     y: 200
//   },
//   direction: {
//     h: 0,
//     v: 0
//   },
//   fruits: 0,
//   trail: [],
//   render() {
//     game.draw.rect(this.position, {x: gameState.tileSize, y: gameState.tileSize}, {fillColor: 'yellow', strokeColor:'black', strokeWidth: 3})
//     this.trail.forEach(el => {
//       game.draw.rect({x: el.x, y: el.y}, {x: gameState.tileSize, y: gameState.tileSize}, {fillColor: 'yellow', strokeColor:'black', strokeWidth: 3})
//     })
//   }
// };

// // Input ###########################################################################
// function moveSnake(event: KeyboardEvent) {
//   switch (event.key) {
//     case 'ArrowRight':
//       if (snake.trail.length == 0 || snake.direction.h !== -1)
//       {
//         snake.direction.h = 1
//         snake.direction.v = 0
//       }
//       break;

//     case 'ArrowLeft':
//       if (snake.trail.length == 0 || snake.direction.h !== 1)
//       {
//         snake.direction.h = -1
//         snake.direction.v = 0
//       }
//       break;

//     case 'ArrowUp':
//       if (snake.trail.length == 0 || snake.direction.v !== 1)
//       {
//         snake.direction.h = 0
//         snake.direction.v = -1
//       }
//       break;

//     case 'ArrowDown':
//       if (snake.trail.length == 0 || snake.direction.v !== -1)
//       {
//         snake.direction.h = 0
//         snake.direction.v = 1
//       }
//       break;
//   }
// }


// // # Game Over

// // Game over button
// const btnReset = {
//   position: {
//     x: game.width / 2 - 50, 
//     y: 230
//   },
//   size: {
//     x: 100, 
//     y: 35
//   },
//   state: false
// }

// // Set hover state
// function btnStyle (state: boolean) {
//   if (state) {
//     return {
//       frameColor: 'yellow',
//       textColor: 'yellow',
//       bg: 'orange'
//     }
//   }

//     return {
//       frameColor: 'gray',
//       textColor: 'gray',
//       bg: '#55555555'
//     }
//   }

// // Game over function
// function gameOver() {
//   // Cursor
//   if (btnReset.state) {
//     document.body.style.cursor = 'pointer';
//   } else {
//     document.body.style.cursor = 'auto';
//   }

//   // Text
//   game.draw.ctx.strokeStyle = 'yellow';
//   game.draw.ctx.lineWidth = 0.5;
//   game.draw.ctx.font = '50px serif';
//   game.draw.ctx.strokeText('GAME OVER', game.width / 2, (game.height - 40) / 2);

//   const style = btnStyle(btnReset.state);

//   // Btn frame
//   game.draw.rect(btnReset.position, btnReset.size, {strokeColor: style?.frameColor})

//   // Btn bg
//   game.draw.rect(btnReset.position, btnReset.size, {fillColor: style?.bg})

//   // Btn text
//   game.draw.ctx.fillStyle = style?.textColor; 
//   game.draw.ctx.font = '20px serif';
//   game.draw.ctx.textAlign = 'center';
//   game.draw.ctx.textBaseline = 'middle';
//   game.draw.ctx.fillText('Play again', btnReset.position.x + btnReset.size.x / 2, btnReset.position.y + btnReset.size.y / 2);  
// }

// // Button hover
// function btnHover(event: MouseEvent) {
//   const rect = game.getBoundingClientRect;
//   const cursorPosition = {
//     x: event.clientX - rect.left,
//     y: event.clientY - rect.top
//   };

//   if (cursorPosition.x > btnReset.position.x && 
//       cursorPosition.x < btnReset.position.x + btnReset.size.x &&
//       cursorPosition.y > btnReset.position.y &&
//       cursorPosition.y < btnReset.position.y + btnReset.size.y) {
//         return btnReset.state = true;
//       }
  
//       btnReset.state = false;
// }

// // Button action
// function btnClick(event: MouseEvent) {
//   if (btnReset.state && event.type == 'click') {
//     snake.position = {x: 200, y: 200};
//     snake.direction = {v: 0, h: 0};
//     snake.fruits = 0;
//     snake.trail= [];
//     gameState.run = true
//   };
// }

// // Fruit randomizer
// function getFruit(): { x: number, y: number } {
//   const fruit = {
//     x: Math.floor(Math.random() * (game.width / gameState.tileSize - 1)) * gameState.tileSize,
//     y: Math.floor(Math.random() * (game.height / gameState.tileSize - 1)) * gameState.tileSize
//   }
  
//   if (fruit.x == snake.position.x && fruit.y == snake.position.y) {
//     return getFruit()
//   };
//   const hit = snake.trail.find(el => {
//     if (el.x == fruit.x && el.y == fruit.y) return el
//   });


//   if (hit) {    
//     return getFruit();
//   }

//   return fruit;
// }

// // Check fruit collision
// function fruitCollision() {
//   gameState.fruits.forEach(fruit => {
//     if (fruit.x == snake.position.x && fruit.y == snake.position.y) {
//       gameState.fruits.pop();
//       snake.fruits++;
//     }
//   });
// }

// // Action ####################################################################
// function snakeRun() {       
//   if (!gameState.run) return;

//   // Add fruit
//   if (gameState.fruits.length == 0) gameState.fruits.push(getFruit());

//   // Add trail
//   snake.trail.push({x: snake.position.x, y: snake.position.y})
//   if (snake.trail.length > snake.fruits) snake.trail.shift();

//   // Horizontal collision
//   if (snake.position.x == 0 && snake.direction.h < 0) {
//     gameState.run = false;
//     return;
//   };
//   if (snake.position.x + gameState.tileSize == game.width && snake.direction.h > 0) {
//     gameState.run = false;
//     return;
//   };

//   // Snake horizontal move
//   snake.position.x += snake.direction.h * gameState.tileSize;
  
//   // Vertical collision
//   if (snake.position.y == 0 && snake.direction.v < 0) {
//     gameState.run = false;
//     return;
//   };
//   if (snake.position.y + gameState.tileSize == game.height && snake.direction.v > 0) {
//     gameState.run = false;
//     return;
//   };

//   // Snake vertical move
//   snake.position.y += snake.direction.v * gameState.tileSize;

//   // Check for fruits
//   fruitCollision();

//    // Check trail collision
//    const trailCollision = snake.trail.find(el => {
//     if (el.x == snake.position.x && el.y == snake.position.y) {
//       console.log(el);
//       return el;
//     }
//   })
  
//   if (trailCollision) gameState.run = false;
// }

// // Set animation clock for snake action
// const snakeTimer = game.getTimer(500);
// snakeTimer.subscribe(snakeRun);

// // Render function
// function render(timeStamp: DOMHighResTimeStamp) {
//   game.draw.clear();

//   // Cursor
//   document.body.style.cursor = 'auto';

//   // Draw BG
//   game.draw.rect({ x: 0, y: 0 }, { x: game.width, y: game.height }, { fillColor: 'black' })

//   // // Snake render delay
//   if (gameState.run) {
//     game.input.reset();
//     game.input.keyDown(moveSnake);
//     snakeTimer.start(timeStamp)
//     snake.render();
//     // Render fruit
//   if (gameState.fruits.length > 0) {
//     game.draw.rect({ x: gameState.fruits[0].x, y: gameState.fruits[0].y }, { x: gameState.tileSize, y: gameState.tileSize }, { fillColor: 'red', strokeWidth: 0 })
//   }

//   } else {
//     game.input.reset();
//     game.input.mouseMove(btnHover);
//     game.input.click(btnClick);
//     gameOver();
//   }
// }

// // Assign Render function as a watcher of game loop
// game.loop.subscribe(render)

// // Start game loop
// game.run();

// console.log(game);
