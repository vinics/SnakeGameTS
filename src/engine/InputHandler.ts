import Input from './Input';
import { InputEvent } from './types/Input'

class InputHandler {
  private onKeyDown: Input;
  
  private onKeyUp: Input;

  private onMouseMove: Input;
  
  private _click: Input;

  constructor() {
    this.onKeyDown = new Input(InputEvent.keydown);
    this.onKeyUp = new Input(InputEvent.keyup);
    this.onMouseMove = new Input(InputEvent.mousemove);
    this._click = new Input(InputEvent.click);
  }

  keyDown(...callbacks: Array<(event: KeyboardEvent) => void>) {
    callbacks.forEach(callback => this.onKeyDown.subscribe(callback))
  }

  keyUp(...callbacks: Array<(event: KeyboardEvent) => void>) {
    callbacks.forEach(callback => this.onKeyUp.subscribe(callback))
  }

  mouseMove(...callbacks: Array<(event: MouseEvent) => void>) {
    callbacks.forEach(callback => this.onMouseMove.subscribe(callback))
  }

  click(...callbacks: Array<(event: MouseEvent) => void>) {
    callbacks.forEach(callback => this._click.subscribe(callback))
  }

  reset() {
    this._click.reset();
    this.onKeyDown.reset();
    this.onKeyUp.reset();
    this.onMouseMove.reset();
  }
}

export default InputHandler;