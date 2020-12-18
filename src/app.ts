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

// const gameInput = game.getInputHandler();
// gameInput.keyDown(moveSnake)

// Game Over

// Button
const btnReset = {
  position: {
    x: game.width / 2 - 50, 
    y: 230
  },
  size: {
    x: 100, 
    y: 35
  },
  state: false
}

function btnStyle (state: boolean) {
  if (state) {
    return {
      frameColor: 'yellow',
      textColor: 'yellow',
      bg: 'orange'
    }
  }

    return {
      frameColor: 'gray',
      textColor: 'gray',
      bg: '#55555555'
    }
  }

// Game over function
function gameOver() {
  // Cursor
  if (btnReset.state) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'auto';
  }

  // Text
  game.draw.ctx.strokeStyle = 'yellow';
  game.draw.ctx.lineWidth = 0.5;
  game.draw.ctx.font = '50px serif';
  game.draw.ctx.strokeText('GAME OVER', game.width / 2, (game.height - 40) / 2);

  const style = btnStyle(btnReset.state);

  // Btn frame
  game.draw.rect(btnReset.position, btnReset.size, {strokeColor: style?.frameColor})

  // Btn bg
  game.draw.rect(btnReset.position, btnReset.size, {fillColor: style?.bg})

  // Btn text
  game.draw.ctx.fillStyle = style?.textColor; 
  game.draw.ctx.font = '20px serif';
  game.draw.ctx.textAlign = 'center';
  game.draw.ctx.textBaseline = 'middle';
  game.draw.ctx.fillText('Play again', btnReset.position.x + btnReset.size.x / 2, btnReset.position.y + btnReset.size.y / 2);  
}

// Button hover
function btnHover(event: MouseEvent) {
  const rect = game.getBoundingClientRect;
  const cursorPosition = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };

  if (cursorPosition.x > btnReset.position.x && 
      cursorPosition.x < btnReset.position.x + btnReset.size.x &&
      cursorPosition.y > btnReset.position.y &&
      cursorPosition.y < btnReset.position.y + btnReset.size.y) {
        return btnReset.state = true;
      }
  
      btnReset.state = false;
}

// Button action
function btnClick(event: MouseEvent) {
  if (btnReset.state && event.type == 'click') {
    snake.position = {x: 200, y: 200};
    snake.direction = {v: 0, h: 0};
    gameState.run = true
  };
}

// Action ####################################################################
function snakeRun() {       
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

// Set animation clock for snake action
const snakeTimer = game.getTimer(500);
snakeTimer.subscribe(snakeRun);

// Render function
function render(timeStamp: DOMHighResTimeStamp) {
  game.draw.clear();

  // Cursor
  document.body.style.cursor = 'auto';

  // Draw BG
  game.draw.rect({ x: 0, y: 0 }, { x: game.width, y: game.height }, { fillColor: 'black' })

  // // Snake render delay
  if (gameState.run) {
    game.input.reset();
    game.input.keyDown(moveSnake);
    snakeTimer.start(timeStamp)
    snake.render();
  } else {
    game.input.reset();
    game.input.mouseMove(btnHover);
    game.input.click(btnClick);
    gameOver();
  }
}

// Assign Render function as a watcher of game loop
game.loop.subscribe(render)

// Start game loop
game.run();

console.log(game);
