import { GAME_BOARD_SIZE } from './game.js';
import { getInputDirection } from './input.js';

let snakeBody = [
  { x: 10, y: 10}

];
export function getSnakeBody()
{
    return snakeBody;
}

export function getSnakeLenght()
{
    return snakeBody.length;
}

export function update(){
    for(let i = snakeBody.length-2; i >= 0; i--)
    {

        snakeBody[i+1] = { ...snakeBody[i]};
    }
    let movement = getInputDirection();
    snakeBody[0].x += movement.x;
    snakeBody[0].y += movement.y;
}
export function draw(gameBoard){
    snakeBody.forEach((segment, index)=>{
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        if(index == 0)
            snakeElement.classList.add('snakeHead');
        else
            snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement);
    });
}
export function onSnake(pos)
{
    return snakeBody.some(segment =>{
        return segment.x === pos.x && segment.y === pos.y;
    })
}
export function foodEaten(foodPosition)
{
   return (foodPosition.x === snakeBody[0].y) && (foodPosition.y === snakeBody[0].x);
}
export function expandSnake(expRate)
{
    for( let i = 0; i<expRate; i++)
    {
       snakeBody.push({ ...snakeBody[snakeBody.length -1]}); // creating a new peace and pushing it to the back
    }
}
function ateMyself()
{
    // i cant eat my self when the body is less than 5 blocks
    if(snakeBody.length < 5)
        return false;
    for(let i=1;i<snakeBody.length;i++)
    {
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y)
            return true;
    }
    return false;
}

export function handleDeath()
{
    if(snakeBody[0].x > GAME_BOARD_SIZE || snakeBody[0].y > GAME_BOARD_SIZE || snakeBody[0].x < 1 || snakeBody[0].y < 1)
        return true;
    else if(ateMyself())
        return true;
    else
        return false;
}
