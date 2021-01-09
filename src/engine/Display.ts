import Point from "./geometry/Point";
import Rectangle from "./geometry/Rectangle";

type color = string | CanvasGradient | CanvasPattern;

interface IDrawingOptions {
  fill?: color;
  stroke?: color;
  lineWidth?: number;
}

class Display {
  private _canvas: HTMLCanvasElement;

  public ctx: CanvasRenderingContext2D

  constructor(canvasElement: HTMLCanvasElement) {
    this.ctx = canvasElement.getContext('2d')!;

    this._canvas = canvasElement;
  }

  public clear() {
    this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }

  // #Rect
  public gRect(rect: Rectangle, options?: IDrawingOptions) {
    this.rect(rect.position, rect.width, rect.height, options)
  }

  public rect(position: Point, width: number, height: number, options?: IDrawingOptions) {
    if (options?.fill) {
      this.ctx.fillStyle = options.fill;
      this.ctx.fillRect(position.x, position.y, width, height);
    }

    if (options?.stroke) {
      this.ctx.strokeStyle = options.stroke;
      
      if (options.lineWidth) this.ctx.lineWidth = options.lineWidth;

      this.ctx.strokeRect(position.x, position.y, width, height);
    }
  }

  public background(color: color) {   
    this.gRect({position: { x: 0, y: 0 }, width: this._canvas.width, height: this._canvas.height}, {fill: color})
  }
}

export default Display;