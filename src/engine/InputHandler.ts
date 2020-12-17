import Input from './Input';
import { InputEvent } from './types/Input'

class InputHandler {
  private onKeyDown: Input;
  
  private onKeyUp: Input;

  constructor() {
    this.onKeyDown = new Input(InputEvent.keydown);
    this.onKeyUp = new Input(InputEvent.keyup);
  }

  keyDown(...callbacks: Array<(event: KeyboardEvent) => void>) {
    callbacks.forEach(callback => this.onKeyDown.subscribe(callback))
  }

  keyUp(...callbacks: Array<(event: KeyboardEvent) => void>) {
    callbacks.forEach(callback => this.onKeyUp.subscribe(callback))
  }
}

export default InputHandler;