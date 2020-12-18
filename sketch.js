var dogSprite, dog1, dog2, database, foodS, foodStock

function preload(){
  dog2=loadImage('images/dogImg.png');
  dog1=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  dogSprite=createSprite(250,250,200,200);
  dogSprite.addImage("dog2",dog2);
  dogSprite.scale=0.3;
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  



  background(46,139,87);
  textSize(20);
  fill(255,255,255);
  stroke(10);
  text("Note: Press UP_ARROW to feed Drago Milk!");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage("dog",dog1);
  }

  text("Food Remaining:"+foodS,170,200);

  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}