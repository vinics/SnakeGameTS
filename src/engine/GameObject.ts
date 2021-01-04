import Clock from "./Clock";
import Point from "./geometry/Point";
import Engine from './Engine';
import AnimationClock from "./AnimationClock";

interface IGameObject {
  position: Point;
  animation?: AnimationClock;

}

class GameObject implements IGameObject{
  position: Point;
  animation?: Clock;

  constructor() {
    this.position = new Point();
  }
}

export default GameObject;