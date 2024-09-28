let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        let winner = playerHasWon();
        if (winner !== false) {
            playerText.innerHTML = `Player ${currentPlayer} has won!`;
            let winning_blocks = winner.combo;

            boxes.forEach((box, index) => {
                if (!winning_blocks.includes(index)) {
                    box.innerText = ''; // Remove text from non-winning boxes
                }
            });
            winning_blocks.forEach(box => {
                if (winner.type === 'horizontal') {
                    boxes[box].classList.add('horizontal-line');
                } else if (winner.type === 'vertical') {
                    boxes[box].classList.add('vertical-line');
                } else if (winner.type === 'diagonal-right') {
                    boxes[box].classList.add('diagonal-line-right');
                } else if (winner.type === 'diagonal-left') {
                    boxes[box].classList.add('diagonal-line-left');
                }
            });

            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            if ((a == 0 && b == 1 && c == 2) || (a == 3 && b == 4 && c == 5) || (a == 6 && b == 7 && c == 8)) {
                return { combo: [a, b, c], type: 'horizontal' };
            }
            if ((a == 0 && b == 3 && c == 6) || (a == 1 && b == 4 && c == 7) || (a == 2 && b == 5 && c == 8)) {
                return { combo: [a, b, c], type: 'vertical' };
            }
            if (a == 0 && b == 4 && c == 8) {
                return { combo: [a, b, c], type: 'diagonal-right' };
            }
            if (a == 2 && b == 4 && c == 6) {
                return { combo: [a, b, c], type: 'diagonal-left' };
            }
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.classList.remove('horizontal-line', 'vertical-line', 'diagonal-line-right', 'diagonal-line-left');
    });

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
}

startGame();
