const EventEmitter = require('events');

class CustomObject extends EventEmitter {
  constructor() {
    super();
  }

  doSomething() {
    const event = {message: 'Hello World!'};
    this.emit('myEventName', event);
  }
}

module.exports = CustomObject;