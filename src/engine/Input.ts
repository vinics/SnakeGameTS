import Listener from "./utils/Listener";
import { InputEvent } from './types/Input'

class Input extends Listener {
  constructor(eventType: InputEvent) {
    super();

    document.addEventListener(eventType, (event) => {
      super.notifyAll(event);
    })
  }
}

export default Input;