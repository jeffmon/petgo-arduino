const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const five = require("johnny-five");
const board = new five.Board();
var led;
var servo;
var piezo;
var door;

board.on("ready", () => {
  led = new five.Led(7);
  servo = new five.Servo({
    pin: 14,
    startAt: 75
  })
  //
  door = new five.Servo({
    pin: 15,
    startAt:75
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


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.get("/open", (req, res) => {
  led.on();
  door.to(175);
  res.end("open!");
});

app.get("/close", (req, res) => {
  led.on();
  door.to(75);
  res.end("close!");
});
