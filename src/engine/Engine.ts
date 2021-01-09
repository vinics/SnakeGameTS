import Clock from './Clock';
import InputHandler from './InputHandler';
import Painter from './Display'
import Display from './Display';

class Engine {
  public _clock: Clock;

  public frameRate: number;

  constructor(frameRate: number) {
    this.frameRate = frameRate;
    this._clock = new Clock(this.frameRate);
  }

  // #PROPS
   
  // #METHODS
  private _runGameLoop(timeStamp: DOMHighResTimeStamp) {
    this._clock.start(timeStamp);
    requestAnimationFrame((timeStamp) => this._runGameLoop(timeStamp));
  }

  public start() {
    requestAnimationFrame((timeStamp) => this._runGameLoop(timeStamp))
  }
}

export default Engine;

// class Engine {
//   private _canvas: HTMLCanvasElement;

//   public loop: Clock;
  
//   public draw: Painter;

//   public input: InputHandler;

//   public frameRate: number = 0.03; // 30 FPS

//   constructor(canvas: HTMLCanvasElement) {
//     this._canvas = canvas
//     this.draw = new Painter(this._canvas.getContext('2d')!, this.width, this.height)

//     this.input = new InputHandler();

//     this.loop = new Clock(this.frameRate);
//   }

//   // Method
//   private _runGameLoop(timeStamp: DOMHighResTimeStamp) {
//     this.loop.start(timeStamp);
//     requestAnimationFrame((timeStamp) => this._runGameLoop(timeStamp));
//   }

//   public run() {
//     requestAnimationFrame((timeStamp) => this._runGameLoop(timeStamp))
//   }

//   public getTimer(value: number) {
//     return new Clock(value);
//   }

//   public getInputHandler() {
//     return new InputHandler();
//   }

//   // Getter and setter
//   public get width() {
//     return this._canvas.width;
//   }

//   public set width(value:number) {
//     this._canvas.width = value;
//   }

//   public get height() {
//     return this._canvas.height;
//   }

//   public set height(value:number) {
//     this._canvas.height = value;
//   }

//   public get getBoundingClientRect (): DOMRect {
//     return this._canvas.getBoundingClientRect();
//   }
// }
