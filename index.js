var Gpio = require('pigpio').Gpio,
  button = new Gpio(18, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
  }),
  led = new Gpio(17, {mode: Gpio.OUTPUT});

button.on('interrupt', function (level) {
  console.log(level,Date.now());
});
