var playerTurn = true;
var computerMoveTimeout = 0;

// Returns an array of 9 <td> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoard() {
    var gameBoardTable = document.getElementById("gameBoard");
    var result = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            result.push(gameBoardTable.rows[i].cells[j]);
        }
    }
    return result;
}

function start() {
    // Setup the click event for the "New game" button
    var newBtn = document.getElementById("newGameButton");
    newBtn.addEventListener("click", newGame);

    // Create click-event listeners for each cell in the game board
    var cells = getGameBoard();
    for (let cell of cells) {
        cell.addEventListener("click", function() { cellClicked(cell); });
    }

    // Call the newGame function to make sure the board is clear
    newGame();
	
	// Change turn info
	var turn_info = document.getElementById("turnInfo");
	turn_info.innerHTML = "Your turn";
}

function newGame() {
	clearTimeout(function(){computerMoveTimeout = 0}); 
	
	// Reset Board
	var gameBoardTable = document.getElementById("gameBoard");
	for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            gameBoardTable.rows[i].cells[j].innerHTML = "&nbsp";
        }
    }
	
	// Reset player's turn
	playerTurn = true;
}

function cellClicked(cell) {
	// Player = X Computer = O
    if (playerTurn && cell.innerHTML == "&nbsp;") {
		cell.innerHTML = "X";
		cell.style.color = "red";
		switchTurn()
	} else if (!playerTurn && cell.innerHTML == "&nbsp;"){
		cell.innerHTML = "O";
		cell.style.color = "blue";
		switchTurn()
	}
}

function switchTurn() {
	// Check for win condition
	var gameOver = false;
	var turn_info = document.getElementById("turnInfo");
	var gameBoardTable = document.getElementById("gameBoard");
    var result = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            result.push(gameBoardTable.rows[i].cells[j]);
        }
    }

	// Win Conditions
	if ((result[0].innerHTML == 'X' && result[1].innerHTML == 'X' && result[2].innerHTML == 'X') || // Row win
		(result[3].innerHTML == 'X' && result[4].innerHTML == 'X' && result[5].innerHTML == 'X') ||
		(result[6].innerHTML == 'X' && result[7].innerHTML == 'X' && result[8].innerHTML == 'X') ||
		(result[0].innerHTML == 'X' && result[3].innerHTML == 'X' && result[6].innerHTML == 'X') || // Column win
		(result[1].innerHTML == 'X' && result[4].innerHTML == 'X' && result[7].innerHTML == 'X') ||
		(result[2].innerHTML == 'X' && result[5].innerHTML == 'X' && result[8].innerHTML == 'X') ||
		(result[2].innerHTML == 'X' && result[4].innerHTML == 'X' && result[6].innerHTML == 'X') || // Diagonal Win
		(result[0].innerHTML == 'X' && result[4].innerHTML == 'X' && result[8].innerHTML == 'X')) {
		console.log("You win!")
		turn_info.innerHTML = "You win!";
		playerTurn = false
		gameOver = true
	} else if((result[0].innerHTML == 'O' && result[1].innerHTML == 'O' && result[2].innerHTML == 'O') || // Row win
		(result[3].innerHTML == 'O' && result[4].innerHTML == 'O' && result[5].innerHTML == 'O') ||
		(result[6].innerHTML == 'O' && result[7].innerHTML == 'O' && result[8].innerHTML == 'O') ||
		(result[0].innerHTML == 'O' && result[3].innerHTML == 'O' && result[6].innerHTML == 'O') || // Column win
		(result[1].innerHTML == 'O' && result[4].innerHTML == 'O' && result[7].innerHTML == 'O') ||
		(result[2].innerHTML == 'O' && result[5].innerHTML == 'O' && result[8].innerHTML == 'O') ||
		(result[2].innerHTML == 'O' && result[4].innerHTML == 'O' && result[6].innerHTML == 'O') || // Diagonal Win
		(result[0].innerHTML == 'O' && result[4].innerHTML == 'O' && result[8].innerHTML == 'O')) {
		console.log("Computer wins!")
		turn_info.innerHTML = "Computer wins!";
		playerTurn = false
		gameOver = true
	} else if (result[3].innerHTML != '&nbsp;' && result[4].innerHTML != '&nbsp;' && result[5].innerHTML != '&nbsp;' &&
		result[6].innerHTML != '&nbsp;' && result[7].innerHTML != '&nbsp;' && result[8].innerHTML != '&nbsp;' &&
		result[0].innerHTML != '&nbsp;' && result[3].innerHTML != '&nbsp;' && result[6].innerHTML != '&nbsp;' && 
		result[1].innerHTML != '&nbsp;' && result[4].innerHTML != '&nbsp;' && result[7].innerHTML != '&nbsp;' &&
		result[2].innerHTML != '&nbsp;' && result[5].innerHTML != '&nbsp;' && result[8].innerHTML != '&nbsp;' &&
		result[2].innerHTML != '&nbsp;' && result[4].innerHTML != '&nbsp;' && result[6].innerHTML != '&nbsp;' &&
		result[0].innerHTML != '&nbsp;' && result[4].innerHTML != '&nbsp;' && result[8].innerHTML != '&nbsp;') {
		console.log("Draw")
		turn_info.innerHTML = "Draw game";
		playerTurn = false
		gameOver = true
	}
	
	if (gameOver == false) {
		var turn_info = document.getElementById("turnInfo");
		// Toggle playerTurn's value
		if (playerTurn) {
			playerTurn = false;
			turn_info.innerHTML = "Computer's turn";
			var computerMoveTimeout = setTimeout(makeComputerMove, 1000);
		} else {
			playerTurn = true;
			turn_info.innerHTML = "Your turn";
		}
	}
}

// Generate random number from 0 to 8
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function makeComputerMove() {
	// Create click-event listeners for each cell in the game board
    var cells = getGameBoard();
	var pick = getRandomInt(8);
	
	if (cells[pick].innerHTML != 'O' && cells[pick].innerHTML != 'X') {
		console.log("In here 3")
		cellClicked(cells[pick]);
	} else {
		pick = getRandomInt(8);
		cellClicked(cells[pick]);
	}
	console.log("Should never reach here");
}

