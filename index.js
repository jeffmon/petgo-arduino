const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const five = require("johnny-five");
const board = new five.Board();
var led;
var servo;
var piezo;
var door1;
var door2;

board.on("ready", () => {
  led = new five.Led(7);

  servo = new five.Servo({
    pin: 14,
    startAt: 75
  })

  door1 = new five.Servo({
    pin: 15,
    startAt: 75
  })

  door2 = new five.Servo({
    pin: 16,
    startAt: 78
  })

  piezo = new five.Piezo({
    pin: 5
  })
})

app.get("/treat", (req, res) => {
  led.on();
  servo.to(3);
  setTimeout(() => {
    servo.to(75);
  }, 500)
  res.end("treat!");
});

app.get("/sound", (req, res) => {
  piezo.frequency(2400, 400);
  led.blink(500);
  res.end("sound!");
})

app.get("/open", (req, res) => {
  led.on();
  door1.to(170, 500);
  door2.to(168, 500);
  res.end("open!");
});

app.get("/close", (req, res) => {
  led.on();
  door1.to(75, 500);
  door2.to(78, 500);
  servo.to(3);
  setTimeout(() => {
    servo.to(75);
  }, 500)
  res.end("close!");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
