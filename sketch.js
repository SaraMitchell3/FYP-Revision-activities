var song;
var button, cnv5;
var env, osc, f;
var amp, amp2, vol, vol2;
var x, y;
var sliderVolume1, sliderVolume2, sliderPan1, sliderPan2;

function preload() {
  song = loadSound("Arensky.mp3");
}

function setup() {

  cnv5 = createCanvas(1200, 1300);
  background(255);

  button = createButton('Play');
  button.position(50, 390);
  button.size(70, 30);
  button.mousePressed(playSong);

  // Sliders
  sliderVolume1 = createSlider(0, 1, 0.5, 0.01);
  sliderVolume1.position(200, 400);

  sliderPan1 = createSlider(-1, 1, 0, 0.01);
  sliderPan1.position(450, 400);

  sliderVolume2 = createSlider(0, 1, 0.5, 0.01);
  sliderVolume2.position(700, 400);

  sliderPan2 = createSlider(-1, 1, 0, 0.01);
  sliderPan2.position(950, 400);

  env = new p5.Env();
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(env);
  osc.start();

  amp1 = new p5.Amplitude();
  amp1.setInput(song);

  amp2 = new p5.Amplitude();
  amp2.setInput(osc);

}

function draw() {

  background(map(sliderPan1.value(), -1, 1, 255, 0));

  song.setVolume(sliderVolume1.value());
  song.pan(sliderPan1.value());
  osc.freq(f);
  osc.pan(sliderPan2.value());
  env.setRange(sliderVolume2.value(), 0);
  env.setADSR(0.01, 0, sliderVolume2.value(), 0.5);

  vol2 = amp2.getLevel();

  if (song.currentTime() > 324.4) {
    song.stop();
    button.html('Play');
  }

  textSize(50);
  textStyle(BOLD);
  fill(255, 125, 0);
  text("Revision Activities", 350, 100);
  textSize(20);
  textStyle(NORMAL);
  fill(0);
  text("In this activity you will become an orchestral musician and play along to Anton Arensky's Suite for orchestra in G minor!", 50, 200);
  text("The bass line is an ostinato that goes D - C# - B - F# - G - A all the way through.", 50, 240);
  text("Click 'Play' and use the shapes to play along!", 50, 280);
  text("Hint: Play around with the sliders that control the volume and pan of the track, and the volume and pan of your instrument,\nand see what happens!", 50, 320);
  text("You may have noticed that in the middle section of the piece the ostinato did not sound good.", 50, 1200);
  text("This is because one note has to be sharpened. Click the star shape to find out which one, and now try playing it correctly!", 50, 1240);

  // Slider labels
  textSize(15);
  push();
  fill(200, 150, 40);
  text("Track volume", 220, 380);
  text("Track pan", 480, 380);
  text("Instrument volume", 703, 380);
  text("Instrument pan", 965, 380);
  pop();

  textSize(18);
  textStyle(BOLD);
  push();
  fill(50, 40, 240);
  text("L", 425, 415);
  text("R", 600, 415);
  text("L", 925, 415);
  text("R", 1100, 415);
  pop();

  // Musical shapes
  stroke(0);
  // Triangle: D
  fill(180, 10, 250, 180);
  triangle(450, 572, 506, 462, 562, 572);
  // Square: C#
  fill(20, 50, 240, 160);
  rect(615, 640, 100, 100);
  // Circle: B
  fill(100, 240, 100, 180);
  ellipse(640, 870, 110, 110);
  // Inverted triangle: F#
  fill(250, 150, 10, 180);
  triangle(410, 920, 500, 1100, 522, 900);
  // Rhomboid: G
  fill(150, 0, 30, 180);
  quad(260, 850, 330, 780, 400, 850, 330, 920);
  // Oval: A
  fill(240, 10, 100, 180);
  ellipse(300, 650, 120, 70);

  // star: G#
  push();
  translate(width * 0.4, height * 0.55);
  rotate(frameCount/(50 + vol2*100)); // clicking the shapes makes it rotate faster
  fill(255, 220, 0);
  star(0, 0, 30, 90, 5);
  pop();

  fill(0);
  text("D", 500, 535);
  text("C#", 655, 695);
  text("B", 635, 875);
  text("F#", 460, 955);
  text("G", 323, 855);
  text("A", 295, 660);

  // Emphasises shapes when they are pressed (size and colour)
  push();
  if (mouseX > 450 && mouseX < 562 && mouseY > 462 && mouseY < 572 && mouseIsPressed) {
    translate(-250, -250);
    scale(1.5);
    fill(180, 10, 250);
    triangle(450, 572, 506, 462, 562, 572);
    fill(0);
    text("D", 500, 535);
  }
  if (mouseX > 615 && mouseX < 715 && mouseY > 640 && mouseY < 740 && mouseIsPressed) {
    translate(-335, -345);
    scale(1.5);
    fill(20, 50, 240);
    rect(615, 640, 100, 100);
    fill(0);
    text("C#", 655, 695);
  }
  if (mouseX > 585 && mouseX < 695 && mouseY > 815 && mouseY < 925 && mouseIsPressed) {
    translate(-320, -430);
    scale(1.5);
    fill(100, 240, 100);
    ellipse(640, 870, 110);
    fill(0);
    text("B", 635, 875);
  }
  if (mouseX > 410 && mouseX < 522 && mouseY > 900 && mouseY < 1100 && mouseIsPressed) {
    translate(-235, -480);
    scale(1.5);
    fill(250, 150, 10);
    triangle(410, 920, 500, 1100, 522, 900);
    fill(0);
    text("F#", 460, 955);
  }
  if (mouseX > 260 && mouseX < 400 && mouseY > 780 && mouseY < 920 && mouseIsPressed) {
    translate(-165, -425);
    scale(1.5);
    fill(150, 0, 30);
    quad(260, 850, 330, 780, 400, 850, 330, 920);
    fill(0);
    text("G", 323, 855);
  }
  if (mouseX > 240 && mouseX < 360 && mouseY > 615 && mouseY < 685 && mouseIsPressed) {
    translate(-150, -325);
    scale(1.5);
    fill(240, 10, 100);
    ellipse(300, 650, 120, 70);
    fill(0);
    text("A", 295, 660);
  }
  if (mouseX > 400 && mouseX < 565 && mouseY > 630 && mouseY < 795 && mouseIsPressed) {
    text("G#", 475, 720);
    fill(255, 200, 0);
  }
  pop();

  // Audiovisuals

  vol = amp1.getLevel(); // comes from track
  var w = vol * 2000;

  var x1 = map(sliderPan2.value(), 0, 1, 70, 890);
  var y1 = map(sliderPan2.value(), 0, 1, 1160, 260);
  var x2 = map(sliderPan2.value(), 0, 1, 70, 890);
  var y2 = map(sliderPan2.value(), 0, 1, 260, 1160);
  var x3 = map(sliderPan2.value(), 0, 1, 890, 70);
  var y3 = map(sliderPan2.value(), 0, 1, 260, 1160);
  var x4 = map(sliderPan2.value(), 0, 1, 890, 70);
  var y4 = map(sliderPan2.value(), 0, 1, 1160, 260);


  push();
  translate(410, -450);
  fill(255, 100, 100);
  ellipse(x1, y1, w, w); // pan R = wide and up, pan L = left and down
  pop();

  push();
  translate(410, 450);
  fill(100, 255, 100);
  ellipse(x2, y2, w, w); // pan R = wide and down, pan L = left and up
  pop();

  push();
  translate(-410, 450);
  fill(100, 100, 255);
  ellipse(x3, y3, w, w); // pan R = left and down, pan L = wide and up
  pop();

  push();
  translate(-410, -450);
  fill(40, 200, 200);
  ellipse(x4, y4, w, w); // pan R = left and up, pan L = wide and down
  pop();

}
//
//
//
//FUNCTIONS
//
//
//

function playSong() {
  if (!song.isPlaying()) {
    song.play();
    button.html('Stop');
  } else {
    song.stop();
    button.html('Play');
  }
}

function envAttack() {

  env.triggerAttack();
}

function mousePressed() {

  if (mouseX > 450 && mouseX < 562 && mouseY > 462 && mouseY < 572) { // triangle
    f = 293.66;
    envAttack();
  } else if (mouseX > 615 && mouseX < 715 && mouseY > 640 && mouseY < 740) { // square
    f = 277.18;
    envAttack();
  } else if (mouseX > 585 && mouseX < 695 && mouseY > 815 && mouseY < 925) { // circle
    f = 246.94;
    envAttack();
  } else if (mouseX > 410 && mouseX < 522 && mouseY > 900 && mouseY < 1100) { // inverted triangle
    f = 185;
    envAttack();
  } else if (mouseX > 260 && mouseX < 400 && mouseY > 780 && mouseY < 920) { // rhomboid
    f = 196;
    envAttack();
  } else if (mouseX > 240 && mouseX < 360 && mouseY > 615 && mouseY < 685) { // oval
    f = 220;
    envAttack();
  } else if (mouseX > 400 && mouseX < 565 && mouseY > 630 && mouseY < 795) { // star
    f = 207.65;
    envAttack();
  }
}

function mouseReleased() {

  env.triggerRelease();
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}