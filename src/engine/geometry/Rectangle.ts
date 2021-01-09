import Point from "./Point";

class Rectangle {
  public position: Point;
  public width: number;
  public height: number;

  constructor(position?: Point, width?: number, height?: number) {
    position ? this.position = position : this.position = new Point();
    width ? this.width = width : this.width = 0;
    height ? this.height = height : this.height = 0;
  }
}

export default Rectangle;