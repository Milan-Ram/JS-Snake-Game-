// -----Game Constants -----------------------------------------------------------------
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("./eat.mp3");
let gameOverSound = new Audio("game-over.mp3");
let directionSound = new Audio("food.mp3");
let speed = 5;
let score = 0;
let snakeArr = [{ x: 13, y: 15 }];
 food ={ x: 10, y: 10 } 
 ;
let lastPaintTime=0;
let key1 = document.getElementById('key1')
let key2 = document.getElementById('key2')
let key3 = document.getElementById('key3')
let key4 = document.getElementById('key4')
// let board = document.getElementById("board");

// -----Game Functions -----------------------------------------------------------------

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake){
  for (let i = 1; i < snakeArr.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
      return true;
    }
  }
  if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 ||  snake[0].y <=0){
    return true
  }
  
}
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
function gameEngine() {
  // updating snake array---------------------------------------------------------------
  if(isCollide(snakeArr)){
    gameOverSound.play();
    inputDir={x:0 ,y:0};
    alert("Game Over !! Press any key to play again");
    snakeArr=[{x:13 ,y: 15}];
    score =0;
    scoreBoard.innerHTML="Score : " + score;
  }
  if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
    directionSound.play();
    score +=1;
    scoreBoard.innerHTML="Score : " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x ,y: snakeArr[0].y + inputDir.y})
     a=2;
     b=16;
    food ={x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
  }
  // moving the snake 
  for (let i = snakeArr.length -2; i>= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  

  // making snake and food -------------------------------------------------------------
  board.innerHTML = "";
//   display snake
snakeArr.forEach((e,index) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake'); 

    }
    board.appendChild(snakeElement);
});
//   display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// -----Main logic starts here -----------------------------------------------------------------
window.requestAnimationFrame(main); 
window.addEventListener('keydown',(e)=>{
inputDir={x:0 ,y:1};
// directionSound.play();

switch (e.key) {
  case "ArrowUp":
    inputDir.x=0;
    inputDir.y=-1;
    break;
  case "ArrowDown":
    inputDir.x=0;
    inputDir.y=1;
    break;
  case "ArrowLeft":
    inputDir.x=-1;
    inputDir.y=0;
    break;
  case "ArrowRight":
    inputDir.x=1;
    inputDir.y=0;
    break;

  default:
    break;
}
})
key2.addEventListener('click',()=>{{inputDir.x=0;inputDir.y=-1;}});
key4.addEventListener('click',()=>{{inputDir.x=0;inputDir.y=1;}});
key1.addEventListener('click',()=>{{inputDir.x=-1;inputDir.y=0;}});
key3.addEventListener('click',()=>{{inputDir.x=1;inputDir.y=0;}});
