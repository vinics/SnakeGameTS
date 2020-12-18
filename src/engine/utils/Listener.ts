class Listener {
  private observers: Array<(args?: unknown) => void> = [];

  protected notifyAll(message: unknown) {
    this.observers.forEach(observer => observer(message))
  }
  
  public subscribe(observerFunction: (args?: any) => void) {
    this.observers.push(observerFunction)
  }

  public reset() {
    this.observers = [];
  }
}

export default Listener;