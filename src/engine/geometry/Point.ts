class Point {
  public x: number;
  public y: number;

  constructor (x?:number, y?: number) {
    x ? this.x = x : this.x = 0;
    y ? this.y = y : this.y = 0;
  }
}

export default Point;