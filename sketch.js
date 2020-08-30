var bananai, bananaGroup;
var obstaclesi, obstaclesGroup;
var backgroundi, backgroundj;
var score, invisibleGround, PLAY, END, gameState;
var Monkey, Monkeya;

function preload() {
  Monkeya = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananai = loadImage("banana.png");
  obstaclesi = loadImage("stone.png");
  backgroundi = loadImage("jungle.jpg");
}
function setup() {
  createCanvas(400, 400);
  
  backgroundj = createSprite(200, 200, 400, 400);
  backgroundj.addImage("jungle", backgroundi);
  
  invisibleGround = createSprite(200, 370, 400, 10);
  invisibleGround.visible = false;
  
  Monkey = createSprite(125, 350, 20, 50);
  Monkey.addAnimation("walking", Monkeya);
  Monkey.scale = 0.10;
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background("white");
  drawSprites();
  textSize(25);
  fill("white");
  if (gameState === PLAY) {
    if (keyDown("space")) {
      Monkey.velocityY = -10;
    }
    Monkey.velocityY = Monkey.velocityY + 0.8;
    if (bananaGroup.isTouching(Monkey)) {
      bananaGroup.destroyEach();
      score = score + 1;
    }
    switch(score) {
      case 10: Monkey.scale = 0.12;
        break;
      case 20: Monkey.scale = 0.14;
        break;
      case 30: Monkey.scale = 0.16;
        break;
      case 40: Monkey.scale = 0.18;
        break;
    }
    Bananas();
    Obstacles();
  }
  Monkey.collide(invisibleGround);
  if(gameState === END) {
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  if (obstaclesGroup.isTouching(Monkey)) {
    gameState = END;
    text("Oops! Game Over", 100, 200);
  }
  if (score === 50) {
    gameState = END
    text("Yay! Game Finish", 100, 200);
  }
  
  text("Score: "+score, 250, 100);
}

function Bananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 200, 5, 5);
    banana.addImage("banana", bananai);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.y = Math.round(random(120, 200));
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}
function Obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(400, 350, 5, 5);
    obstacle.addImage("stone", obstaclesi);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}