import Clock from './Clock';
import InputHandler from './InputHandler';
import Painter from './Painter'

class Engine {
  private _canvas: HTMLCanvasElement;

  public loop: Clock;
  
  public draw: Painter;

  public input: InputHandler;

  public frameRate: number = 0.03; // 30 FPS

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this.draw = new Painter(this._canvas.getContext('2d')!, this.width, this.height)

    this.input = new InputHandler();

    this.loop = new Clock(this.frameRate);
  }

  // Method
  private _runGameLoop(timeStamp: DOMHighResTimeStamp) {
    this.loop.start(timeStamp);
    requestAnimationFrame((timeStamp) => this._runGameLoop(timeStamp));
  }

  public run() {
    requestAnimationFrame((timeStamp) => this._runGameLoop(timeStamp))
  }

  public getTimer(value: number) {
    return new Clock(value);
  }

  public getInputHandler() {
    return new InputHandler();
  }

  // Getter and setter
  public get width() {
    return this._canvas.width;
  }

  public set width(value:number) {
    this._canvas.width = value;
  }

  public get height() {
    return this._canvas.height;
  }

  public set height(value:number) {
    this._canvas.height = value;
  }

  public get getBoundingClientRect (): DOMRect {
    return this._canvas.getBoundingClientRect();
  }
}

export default Engine;