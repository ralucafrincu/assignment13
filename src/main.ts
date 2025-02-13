const boardElement = document.getElementById('board')
const winnerElement = document.getElementById('winner')
const restartButton = document.getElementById('restart')
const cellsElement = document.querySelectorAll('.cell')

let board: string[] = ['', '', '', '', '', '', '', '', '']
let currentPlayer: 'X' | 'O' = 'X'
let gameActive: boolean = true

const winningConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

if(boardElement && winnerElement && restartButton && cellsElement) {

    function handleCellClick(event: MouseEvent) {
        const cell = event.target as HTMLButtonElement
        const index = parseInt(cell.getAttribute('data-index') || '-1')

        if (index >= 0 && board[index] === '' && gameActive) {
            board[index] = currentPlayer
            cell.textContent = currentPlayer
            checkResult()
            if (gameActive) {
                if (currentPlayer === 'X') {
                    currentPlayer = 'O'
                } else {
                    currentPlayer = 'X'
                }
            }
        }
    }

    function checkResult() {
        let roundWon = false
        for (let i = 0; i < winningConditions.length; i++) {
            const condition = winningConditions[i]
            const a = board[condition[0]]
            const b = board[condition[1]]
            const c = board[condition[2]]

            if (a !== '' && b !== '' && c !== '' && a === b && b === c) {
                roundWon = true
                break
            }
        }

        if (roundWon) {

            winnerElement.textContent = `Player ${currentPlayer} wins!`
            gameActive = false
        } else if (board.indexOf('') === -1) {
            winnerElement.textContent = "It's a draw!"
            gameActive = false
        }
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', '']
        gameActive = true
        currentPlayer = 'X'
        winnerElement.textContent = ''

        cellsElement.forEach(cell => cell.textContent = '')
    }

    boardElement.addEventListener('click', handleCellClick)
    restartButton.addEventListener('click', restartGame)

}
