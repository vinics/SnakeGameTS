type color = string | CanvasGradient | CanvasPattern;

interface IPoint {
  x: number
  y: number
}

interface IRectOptions {
  strokeWidth?: number;
  strokeColor?: color;
  fillColor?: color;
}

class Painter {
  public ctx: CanvasRenderingContext2D
  private _width: number;
  private _height: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx

    this._width = width;
    this._height = height;
  }

  public clear() {
    this.ctx.clearRect(0, 0, this._width, this._height)
  }

  fillRect(startX: number, startY: number, endX: number, endY: number) {
    this.ctx.strokeRect(startX, startY, endX, endY)
  }

  rect(start: IPoint, end: IPoint, options: IRectOptions) {
    const {strokeColor, strokeWidth, fillColor} = options;
    
    if (strokeColor) this.ctx.strokeStyle = strokeColor
    if (strokeWidth) this.ctx.lineWidth = strokeWidth
    if (fillColor) this.ctx.fillStyle = fillColor

    this.ctx.strokeRect(start.x, start.y, end.x, end.y)
    this.ctx.fillRect(start.x, start.y, end.x, end.y)
  }
}

export default Painter;