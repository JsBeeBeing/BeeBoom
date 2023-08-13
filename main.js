const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')
const btnLeft = document.getElementById('btnLeft')
const btnRight = document.getElementById('btnRight')
const btnUp = document.getElementById('btnUp')
const btnDown = document.getElementById('btnDown')
const heart = document.getElementById('lives')
window.addEventListener('load', resizeGame);
window.addEventListener('resize', resizeGame)
window.addEventListener('keydown',(event)=>{
  let key= event.key;
  switch (key) {
    case "ArrowUp":
      movUp()
      break;

    case "ArrowDown":
      movDown()
    break;

    case "ArrowLeft":
      movLeft()
      break;

    case "ArrowRight":
      movRight()
      break;

    default:
      break;
  }})
btnLeft.addEventListener('click',movLeft);
btnRight.addEventListener('click',movRight);
btnUp.addEventListener('click',movUp);
btnDown.addEventListener('click',movDown);
let canvaSize;
let objectSize;
let posX;
let posY
let level = 0
let lives = 3
let restartGame= false
const player ={
  positionx: undefined,
  positiony: undefined,

}
const gift={
  positionx: undefined,
  positiony: undefined
}
let enemiesPositions = []

function movLeft(){
  console.log('Movimiento a la izquierda');
  if ((player.positionx - objectSize).toFixed(1)<objectSize) {
    console.log('OUT');
  }
  else{
    player.positionx -=objectSize
    startGame()}
}
function movRight(){
  console.log('Movimiento a la derecha');
  if ((player.positionx + objectSize).toFixed(1)>canvaSize) {
    console.log('OUT');
  }
  else{
    player.positionx +=objectSize
    startGame()}
}
function movUp(){
  console.log('Movimiento a la arriba');
  if ((player.positiony - objectSize).toFixed(1)<objectSize) {
    console.log('OUT');
  }
  else{
    player.positiony -=objectSize
    startGame()}
}
function movDown(){
  console.log('Movimiento a la abajo');
  if ((player.positiony + objectSize).toFixed(1)>canvaSize) {
    console.log('OUT');
  }
  else{
    player.positiony +=objectSize
    startGame()}
}

function resizeGame(){
  if (window.innerWidth > window.innerHeight) {
    canvaSize = window.innerHeight * 0.80;
  }else{
    canvaSize = window.innerWidth * 0.80;  
  }
  canvas.setAttribute('width',  canvaSize )
  canvas.setAttribute('height',  canvaSize)
  objectSize = canvaSize/10
  startGame()
}

function startGame(){

  // Dividir en 10 partes iguales el canvas y rellenarlo con el emoji de explosion
  ctx.font = objectSize + 'px Roboto'
  ctx.textAlign = 'end'

  // A partir de maps.js, ser capaz de renderizar los mapas dentro del arreglo de maps, sabiendo lo que representa cada letra dentro del array
    const mapa = maps[level]
    if(!mapa){
      gameWin()
      return ;
    }

  showLives()
  const mapaRows = mapa.trim().split('\n').map(row=> row.trim()) //Si accedo bidemensionalente a un array de string, el segundo indice pertenece a los caracteres que componen al string
  const mapaCol = mapaRows.map(row=> row.split(''))
  enemiesPositions = []
  ctx.clearRect(0,0,canvaSize,canvaSize)
  mapaCol.forEach((row,rowI) => {
      row.forEach((col,colI)=>{
        const emoji = emojis[col]
        posX = objectSize*(colI+1)
        posY = objectSize*(rowI+1)
        ctx.fillText(emoji,posX,posY)
        if(emoji == emojis['O']){
          if (!player.positionx && !player.positiony) {
            player.positionx = posX
            player.positiony = posY
          }
          }else if (emoji == emojis['I']) {
            gift.positionx = posX
            gift.positiony = posY
          }else if (emoji == emojis['X']) {
            enemiesPositions.push({
              positionx: posX,
              positiony: posY})
          }
          ctx.fillText(emoji,posX,posY)
          
        })
    });
  
    movPlayer()

}

function movPlayer(){
 
    const colision = enemiesPositions.find(elem => {
      const colisionX = elem.positionx.toFixed(2) == player.positionx.toFixed(2)
      const colisionY =elem.positiony.toFixed(2) == player.positiony.toFixed(2)
      return colisionX && colisionY 
    })
    const positionsX = player.positionx.toFixed(2) == gift.positionx.toFixed(2)
    const positionsY = player.positiony.toFixed(2) == gift.positiony.toFixed(2)
    
    if (positionsX && positionsY) {
      levelUp()
      return
    }
    else if(colision){
      uLost()
      return  
    }
    ctx.fillText(emojis['PLAYER'],player.positionx,player.positiony)

}
function levelUp(){
  console.log('Pass');
  level++
  startGame()
}
function gameWin() {
  console.log('¡Terminaste el juego!');
}

function showLives(){
  //const numbLives = Array(lives).fill(emojis['HEART'])
  //heart.innerText = numbLives Solucion mia
  //numbLives.forEach(obj => heart.innerText = obj) Segunda solucion mia
  heart.innerHTML = emojis["HEART"].repeat(lives) //Solución comunidad
}

// al chocar con una bomba volver al inicio del juego
function uLost(){
  lives--;
  console.log('Perdistes');
  console.log(lives);
  if (lives <=0) {
    level = 0
    lives = 3
  }
  player.positionx = undefined
  player.positiony = undefined
  startGame()
}


// Tarea: visualizar el movimiento del personaje

  // Dibujar emojis: ctx.fillText(emojis['PLAYER'],posX,posY)
  // Codigo agregado
  /* 
  let posX;
  let posY
  let doorPX
  let doorPY
  if(emoji == emojis['O']){ //Dibujar calavera en el inicio de la puerta
        console.log({posX,posY});
        doorPX = posX
        doorPY = posY
          ctx.fillText(emojis['PLAYER'],posX,posY)
        }
      function movLeft(){
    console.log('Movimiento a la izquierda');
    doorPX -=objectSize
    ctx.fillText(emojis['PLAYER'],doorPX,doorPY)
  }
  function movRight(){
    console.log('Movimiento a la derecha');
    doorPX +=objectSize
    ctx.fillText(emojis['PLAYER'],doorPX,doorPY)
  }
  function movUp(){
    console.log('Movimiento a la arriba');
    doorPY -=objectSize
    ctx.fillText(emojis['PLAYER'],doorPX,doorPY)
  }
  function movDown(){
    console.log('Movimiento a la abajo');
    doorPY +=objectSize
    ctx.fillText(emojis['PLAYER'],doorPX,doorPY)
  }
 
 */


// Tarea 2(jul 13 2023): Recrear las colisones, tanto para las bombas como para el regalo 
//Tarea 3 jul 20 2023: al chocar con una bomba volver al inicio del juego

/*  Forma utilizando array bidimensionales para acceder a los caracteres
   console.log(mapa,mapaRows, mapaCol);
  
   for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      ctx.fillText(emojis[mapaCol[row-1][col-1]], objectSize*col, objectSize*row)
     
    }}  */
  

