import Listener from "./utils/Listener";

class Clock extends Listener {
  public timer: number;
  private _current?: DOMHighResTimeStamp;

  constructor(timer: number) {
    super();
    this.timer = timer;    
  }

  public start(timeStamp: DOMHighResTimeStamp) {   
    
       
    if (this._current == undefined) this._current = timeStamp;

    const elapsed = timeStamp - this._current;
    
    if (elapsed >= this.timer) {
      this._current = timeStamp      
      super.notifyAll(timeStamp);
    }
  }

}

// class Clock {
//   private _updateRate: number;
//   private _start: DOMHighResTimeStamp | undefined;

//   constructor(updateRate: number) {
//     this._updateRate = updateRate
//   }

//   public exec(timeStamp: DOMHighResTimeStamp, ...callbacks: Array<(ts: DOMHighResTimeStamp) => void>) {
//     if (this._start == undefined) this._start = timeStamp

//     const elapsed = timeStamp - this._start

//     if (elapsed >= this._updateRate) {
//       this._start = timeStamp
      
//       callbacks.forEach(callback => callback(timeStamp))
//     }
//   }
// }

export default Clock;