import Input from './Input';
import Listener from './utils/Listener';

type InputEvent = KeyboardEvent | MouseEvent;

class InputHandler {
  private _InputListener: Listener;
  
  constructor() {
    this._InputListener = new Listener();

    document.addEventListener('keydown', (e) => {
      this._InputListener.notifyAll(e);
    })

    document.addEventListener('keyup', (e) => {
      this._InputListener.notifyAll(e);
    })
  }

  // Methods
  public register(inputFunction: (event: InputEvent) => void) {
    this._InputListener.subscribe(inputFunction);
  }

  public unregister(inputFunction: (event: InputEvent) => void) {
    const observerId = this._InputListener.observers.findIndex(fn => fn.toString() === inputFunction.toString());
    this._InputListener.observers.splice(observerId, 1);
  }


  // private onKeyDown: Input;
  
  // private onKeyUp: Input;

  // private onMouseMove: Input;
  
  // private _click: Input;

  // constructor() {
  //   this.onKeyDown = new Input(InputEvent.keydown);
  //   this.onKeyUp = new Input(InputEvent.keyup);
  //   this.onMouseMove = new Input(InputEvent.mousemove);
  //   this._click = new Input(InputEvent.click);
  // }

  // keyDown(...callbacks: Array<(event: KeyboardEvent) => void>) {
  //   callbacks.forEach(callback => this.onKeyDown.subscribe(callback))
  // }

  // keyUp(...callbacks: Array<(event: KeyboardEvent) => void>) {
  //   callbacks.forEach(callback => this.onKeyUp.subscribe(callback))
  // }

  // mouseMove(...callbacks: Array<(event: MouseEvent) => void>) {
  //   callbacks.forEach(callback => this.onMouseMove.subscribe(callback))
  // }

  // click(...callbacks: Array<(event: MouseEvent) => void>) {
  //   callbacks.forEach(callback => this._click.subscribe(callback))
  // }

  // reset() {
  //   this._click.reset();
  //   this.onKeyDown.reset();
  //   this.onKeyUp.reset();
  //   this.onMouseMove.reset();
  // }
}

export default InputHandler;