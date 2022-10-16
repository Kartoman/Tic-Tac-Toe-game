// Elements
const tiles = document.querySelectorAll('.tile');
const strike = document.getElementById('strike');
const gameOverArea = document.getElementById('game-over-area');
const gameOverText = document.getElementById('game-over-text');
const winner = document.getElementById('winner');
const playAgain = document.getElementById('play-again');
playAgain.addEventListener("click", startNewGame);

// Sounds
const gameOverSound = new Audio('Sounds/game_over.wav');
const clickSound = new Audio('Sounds/click.wav');

// Variable

const PLAYER_X = 'X';
const PLAYER_O = 'O';
let turn = PLAYER_X;

// Function

const boardState = Array(tiles.length);
boardState.fill(null);

tiles.forEach(tile => tile.addEventListener('click', tileClick));

function setHoverText() {
    tiles.forEach(tile => {
        tile.classList.remove('x-hover');
        tile.classList.remove('o-hover');
    })

    const hoverClass = `${turn.toLowerCase()}-hover`;
    const pointer = 'pointer'

    tiles.forEach(tile => {
        if (tile.innerText === '') {
            tile.classList.add(hoverClass);
        } else {
            tile.classList.add(pointer)
        }
    })
}

setHoverText();

function tileClick(e) {
    if (gameOverArea.classList.contains('visible')) {
        return;
    }
    const tile = e.target;
    const tileNumber = tile.dataset.index;

    if (tile.innerText != '') {
        return;
    }

    if (turn === PLAYER_X) {
        tile.innerText = PLAYER_X;
        boardState[tileNumber - 1] = PLAYER_X;
        turn = PLAYER_O;
    } else {
        tile.innerText = PLAYER_O;
        boardState[tileNumber - 1] = PLAYER_O;
        turn = PLAYER_X;
    }
    clickSound.play();
    setHoverText();
    checkWinner();
}

function checkWinner() {
    for (const winningCondition of winningConditions) {
        const combo = winningCondition.combo;
        const strikeClass = winningCondition.strikeClass;

        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if (
            tileValue1 != null &&
            tileValue1 === tileValue2 &&
            tileValue2 === tileValue3
        ) {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }
    const allTileFilledIn = boardState.every(tile => tile !== null);
    if (allTileFilledIn) {
        gameOverScreen();
    }

}

function gameOverScreen(winnerText) {
    let text = 'Draw!';
    if (winnerText != null) {
        text = `The Winner is ${winnerText}!`;
    }
    gameOverArea.className = 'visible';
    tiles.forEach(tile => {
        tile.classList.remove('x-hover');
        tile.classList.remove('o-hover');
    })
    winner.innerText = text;
    gameOverSound.play();
}

function startNewGame() {
    window.location.reload();
}

const winningConditions = [
    //rows
    {
        combo: [1, 2, 3],
        strikeClass: 'strike-row-1'
    },
    {
        combo: [4, 5, 6],
        strikeClass: 'strike-row-2'
    },
    {
        combo: [7, 8, 9],
        strikeClass: 'strike-row-3'
    },
    //collumns
    {
        combo: [1, 4, 7],
        strikeClass: 'strike-collumn-1'
    },
    {
        combo: [2, 5, 8],
        strikeClass: 'strike-collumn-2'
    },
    {
        combo: [3, 6, 9],
        strikeClass: 'strike-collumn-3'
    },
    //diagonals
    {
        combo: [1, 5, 9],
        strikeClass: 'strike-diagonal-1'
    },
    {
        combo: [3, 5, 7],
        strikeClass: 'strike-diagonal-2'
    },
]