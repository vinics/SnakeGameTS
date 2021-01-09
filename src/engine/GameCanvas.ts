import Display from "./Display";
import Engine from "./Engine";
import GameObject from "./GameObject";
import InputHandler from "./InputHandler";
import Scene from "./Scene";
import Listener from "./utils/Listener";

class GameCanvas {
  private _canvas: HTMLCanvasElement;
  private engine: Engine;

  public display: Display;
  public input: InputHandler;
  // private scenes: Scene[] = [];

  constructor(canvasElement:HTMLCanvasElement) {
    this._canvas = canvasElement;
    this.engine = new Engine(30 / 1000);
    this.display = new Display(canvasElement);
    this.input = new InputHandler();
  }

  // #PROPS
  public get width() {
    return this._canvas.width;
  }

  public get height() {
    return this._canvas.height;
  }

  public set frameRate(frameRate: number) {
    this.engine.frameRate = frameRate;
  }

  // #METHODS
  public setSize(width: number, height: number) {
    this._canvas.width = width;
    this._canvas.height = height;
  }

  public render(...gameObjects: GameObject[]) {
    this.display.clear();
    gameObjects.forEach(obj => obj.render());
  }

  public register(fn: (args?: any) => void) {
    this.engine._clock.subscribe(fn);
  }

  public run() {
    this.engine.start();
  }

  // public setScene(id: string): Scene {

  //   const idExists = this.scenes.find(scene => scene.id === id);

  //   if (idExists) throw new Error(`A scene with id: ${id} already exists!`);

  //   const scene = new Scene(id);
  //   this.scenes.push(scene);
  //   return scene;
  }

  // public scene(id: string) {
  //   return this.scenes.find(scene => scene.id === id);
  // }
// }

export default GameCanvas;