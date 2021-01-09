import Clock from "./Clock";
import Point from "./geometry/Point";
import Engine from './Engine';
import AnimationClock from "./AnimationClock";

abstract class GameObject{
  id: string;
  position: Point;

  // abstract render(timeStamp: DOMHighResTimeStamp, ...args: any[]): void
  abstract render(...args: any[]): void

  constructor(id: string) {
    this.id = id;
    this.position = new Point(0, 0);
  }

  // public id: string;
  // public position: Point;

  // constructor(id: string) {
  //   this.id = id;
  //   this.position = new Point();
  // }
}

export default GameObject;