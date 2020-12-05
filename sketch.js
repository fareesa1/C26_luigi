var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cactus,fence
var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  trex_running = loadAnimation("m1.png","m2.png","m3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("bg2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(800, 500);
  
   ground = createSprite(300,250);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
   ground.scale =2
  trex = createSprite(300,300);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
 cactus = createSprite(100, 610);
  cactus.addImage(obstacle1);
  cactus.scale = 0.5;
  fence = createSprite(300,random(400,450));
 fence.addImage(cloudImage);
  fence.scale = 2;
  fence.debug = true;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,600,1000,20);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("circle",0,0,40);
  trex.debug = true;
  
  score = 0;
  
}

function draw() {
  
  background(0);
  //displaying score
  text("Score: "+ score, 500,50);
 
  camera.x=trex.x;
  camera.y=trex.y;
  if (keyDown("right")) {
    trex.x = trex.x+7;
    trex.mirrorX(1);
  }

  if (keyDown("left")) {
    trex.x = trex.x-7;
    trex.mirrorX(-1);    
  }
  //console.log(sprite.y);
  if (keyDown("space") && trex.y > 550) {
    trex.velocityY = -12;
  }
  trex.velocityY +=0.5;

  if(trex.x-cactus.x>200) cactus.x=trex.x+200;
  if(cactus.x-trex.x>200) cactus.x=trex.x-200;
  if(trex.x-fence.x>200) fence.x=trex.x+200;
  if(fence.x-trex.x>200) fence.x=trex.x-200;
  if(trex.x-invisibleGround.x>200) invisibleGround.x = trex.x+200;
  if(invisibleGround.x-trex.x>200) invisibleGround.x = trex.x-200;
  if(ground.x-trex.x>200) ground.x = trex.x-200;
  if(trex.x-ground.x>200) ground.x = trex.x+200;
    trex.collide(fence);
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  

  
  drawSprites();
}

