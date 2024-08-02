const board = document.getElementById('game-board');

const cells = document.querySelectorAll('.cell');

const status = document.getElementById('status');

const restartBtn = document.getElementById('restart-btn');


let currentPlayer = 'X';

let boardState = Array(9).fill(null);

let gameActive = true;


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


function handleClick(e)
{
    
const index = e.target.dataset.index;
    
if (boardState[index] || !gameActive) return;

    
boardState[index] = currentPlayer;
    
e.target.textContent = currentPlayer;

    
if (checkWin()) 
{
        
status.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        
return;
    
}

    
if (boardState.every(cell => cell)) 
{
        
status.textContent = 'It\'s a draw!';
        
gameActive = false;
        
return;
    
}

    
currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

}


function checkWin() 
{
    
return winningConditions.some(condition => 
{
        const [a, b, c] = condition;
        
return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    
});

}


function restartGame() 
{
    
boardState = Array(9).fill(null);
    
gameActive = true;
    
currentPlayer = 'X';
    
cells.forEach(cell => cell.textContent = '');
    status.textContent = '';

}


cells.forEach(cell => cell.addEventListener('click', handleClick));

restartBtn.addEventListener('click', restartGame);