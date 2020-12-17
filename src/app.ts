// Presentantion
// Input
// Network
// Game logic

import Engine from './engine/Engine'

// Define Canvas
const game = new Engine(<HTMLCanvasElement>document.getElementById('board1'))

// Set size
game.width = 400;
game.height = 400;

// Game state
const gameState = {
  tileSize: 40,
  run: true
}

// Snake
const snake = {
  position: {
    x: 200,
    y: 200
  },
  direction: {
    h: 0,
    v: 0
  },
  render() {
    game.draw.rect(this.position, {x: gameState.tileSize, y: gameState.tileSize}, {fillColor: 'yellow', strokeColor:'black'})
  }
};

// Input ###########################################################################
const gameInput = game.getInputHandler();
gameInput.keyDown(moveSnake)


function moveSnake(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowRight':
      snake.direction.h = 1
      snake.direction.v = 0
      break;

    case 'ArrowLeft':
      snake.direction.h = -1
      snake.direction.v = 0
      break;

    case 'ArrowUp':
      snake.direction.h = 0
      snake.direction.v = -1
      break;

    case 'ArrowDown':
      snake.direction.h = 0
      snake.direction.v = 1
      break;
  }
}

function snakeAction() {       
  if (!gameState.run) return;

  // Horizontal collision
  if (snake.position.x == 0 && snake.direction.h < 0) {
    gameState.run = false;
    return;
  };
  if (snake.position.x + gameState.tileSize == game.width && snake.direction.h > 0) {
    gameState.run = false;
    return;
  };

  // Snake horizontal move
  snake.position.x += snake.direction.h * gameState.tileSize;
  
  // Vertical collision
  if (snake.position.y == 0 && snake.direction.v < 0) {
    gameState.run = false;
    return;
  };
  if (snake.position.y + gameState.tileSize == game.height && snake.direction.v > 0) {
    gameState.run = false;
    return;
  };

  // Snake vertical move
  snake.position.y += snake.direction.v * gameState.tileSize;
}

const snakeTimer = game.getTimer(500);

snakeTimer.subscribe(snakeAction);

// Render
function render(timeStamp: DOMHighResTimeStamp) {
  game.draw.clear();

  // Draw BG
  game.draw.rect({ x:0, y: 0 }, { x: game.width, y: game.height }, { fillColor: 'black' })

  // Snake render delay
  snakeTimer.start(timeStamp)
  snake.render();
}

game.loop.subscribe(render)
game.run();

console.log(game);
