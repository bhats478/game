// Sanjana's game: SNOWCATCH 

var player;
var foodSprites; // <--- STEP 1: create a global variable for the group
var player;
var playerImg;
var score = 0;
var lives = 3;

function preload(){
  playerImg = loadImage ('hug.png')
}

function setup() {
  createCanvas(700, 500);
  player = createSprite(width/2, height - 50);
  player.addImage (playerImg);

  foodSprites = new Group(); // <--- STEP 2: create a new group

}

function draw() {
  background("mediumturquoise");
  drawSprites();
  textSize(30);
  text("score:",15,100)
  text(score,110,100);
  textSize(30);
  text("lives:",30,150)
  text(lives,110,150);
  textSize(60)
  text("SNOWCATCH",15,60)


  if(keyIsPressed){
      if(keyCode == LEFT_ARROW){
        player.setVelocity(-5,0); //<-- move left by subtracting from x
      }
      if(keyCode == RIGHT_ARROW){
        player.setVelocity(5,0); //<-- move right by adding to x
      }
    } else{
      player.setVelocity(0,0); //<-- if no key is pressed stop moving
    }

    player.overlap(foodSprites, eat);

    if (lives <  1){
      window.clearInterval(timer);
      stroke("red");
      fill("red");
      text("YOU LOST",250,250);}

    if (score > 49) {
      window.clearInterval(timer);
      stroke("blue");
      fill("blue")
      text("YOU WON :)",250,250);
    }

  }

var timer = setInterval(
  function(){
    //regular and yellow snow
    for(var i = 0;i<11;i++){
      var food = createSprite(random(0,width), random(-height,0), 20, 20);
      if (i == 5){
        food.shapeColor = color("yellow");
        food.setVelocity(0,5);
        food.life = 300;
        food.kind = "bad";
        foodSprites.add(food);
      }else{
      food.shapeColor = color("white");
      food.setVelocity(0,5);
      food.kind = "good";
      food.life = 300;
      foodSprites.add(food);
    }
    }
  }, 3000);


function eat(spriteA, spriteB) {  //<-- spriteA is the player, spriteB is the food
  if(spriteB.kind == "good"){
  score = score + 1;
}else if (spriteB.kind == "bad"){
  lives = lives - 1
}
  spriteB.remove(); //<-- this deletes the food


}
