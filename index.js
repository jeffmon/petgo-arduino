const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const five = require("johnny-five");
const board = new five.Board();
var led;
var servo;

board.on("ready", () => {
  led = new five.Led(7);

  servo = new five.Servo({
    pin:14,
    startAt: 75
  })
   led.blink(500);
})

app.get("/open", (req, res) => {
  led.on();
  servo.to(3);
  res.end("open!");
});

app.get("/close", (req, res) => {
  led.on();
  servo.to(75);
  res.end("close!");
});


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
