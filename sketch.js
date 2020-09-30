var dog, happyDog, foodS, foodStock, database;

function preload()
{
  dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dogSprite = createSprite(250, 200, 400 , 100);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.5;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog)
  }
  textSize(20);
  fill("white")
  text("food remaining: " + foodS, 100, 50)
  drawSprites();
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}



