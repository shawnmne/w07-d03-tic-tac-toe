window.addEventListener("load", setUpPage);

function setUpPage () {
	var elements = document.getElementsByClassName("board-tile");
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", selectMove);
	}

	var elements = document.getElementsByClassName("new-game");
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", newGame);
	}

	var elm = document.getElementById("reset-button");
	elm.addEventListener("click", reset);
	var elm = document.getElementById("x-score");
	elm.innerHTML = 0;
	var elm = document.getElementById("o-score");
	elm.innerHTML = 0;	
};

var move = 0;
var turn = 0;
var switcher = "";
var win = false;
var symbol = "";
var board = [["","",""],["","",""],["","",""]];

function addClass(el, className){
	el.classList.add(className);
}

function removeClass(el, className){
	el.classList.remove(className);
}

function switchToVisible(message) {
		switcher = document.getElementById(message);
		removeClass(switcher, "hidden");
		addClass(switcher, "visible");	
}

function switchToHidden(message) {
		switcher = document.getElementById(message);
		removeClass(switcher, "visible");
		addClass(switcher, "hidden");	
}

function turnSwitch(move) {
	if (move % 2 === 1) {
		switchToVisible("player-o-ready");
		switchToHidden("player-x-ready");
	}
	else {
		switchToVisible("player-x-ready");
		switchToHidden("player-o-ready");
	}
}

function assignSymbol() {
	if (turn % 2 === 1) {
		symbol = "O";
	}
	else {
		symbol = "X";
	}	
}

function populateArray(assign) {
switch(assign) {
    case "tile-1-1":
      board[0][0] = symbol;
      break;
    case "tile-1-2":
      board[0][1] = symbol;
      break;
    case "tile-1-3":
      board[0][2] = symbol;
      break;
    case "tile-2-1":
      board[1][0] = symbol;
      break;
    case "tile-2-2":
      board[1][1] = symbol;
      break;
    case "tile-2-3":
      board[1][2] = symbol;
      break;
    case "tile-3-1":
      board[2][0] = symbol;
      break;
    case "tile-3-2":
      board[2][1] = symbol;
      break;
    case "tile-3-3":
      board[2][2] = symbol;
      break;
  }	
}

function updateScore(message) {
	var elm = document.getElementById(message);
	elm.innerHTML = parseInt(elm.innerHTML) + 1;	
}

function selectMove() {
	assignSymbol();
	this.innerHTML = symbol;
	populateArray(this.id);
	checkForWinner();

	if (win) {
		if (turn % 2 === 1){
			switchToHidden("player-o-ready");
			switchToVisible("player-o-wins");
			removeListeners();
			updateScore("o-score");
			createLog("o-wins");		
		}
		else {
			switchToHidden("player-x-ready");
			switchToVisible("player-x-wins");
			removeListeners();
			updateScore("x-score");
			createLog("x-wins");				
		}

	}
	else if (move === 8) {
		switchToVisible("tie-game");
		switchToHidden("player-x-ready");
		switchToHidden("player-o-ready");
		removeClass(switcher, "visible");	
		createLog("cat's game");	
	}	
	turn++;
	move++;
	if  (move < 8 && !win) {
		turnSwitch(turn);
	}
	this.removeEventListener("click", selectMove);
}


function checkForWinner() {
  win =     board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol ||
            board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol ||
            board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol ||
            board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol ||
            board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol ||
            board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol ||
            board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol ||
            board[2][0] === symbol && board[1][1] === symbol && board[0][2] === symbol;
}

function addListeners() {
	var elements = document.getElementsByClassName("board-tile");
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", selectMove);
	}	
}

function removeListeners() {
	var elements = document.getElementsByClassName("board-tile");
	for (var i = 0; i < elements.length; i++) {
		elements[i].removeEventListener("click", selectMove);
	}
}

function reset() {	
	 turn = 0;
	 switcher = "";
	 symbol = "";
	 emptyList();
	 switchToVisible("player-x-ready");
	 switchToHidden("player-o-ready");
	var elm = document.getElementById("x-score");
	elm.innerHTML = 0;
	var elm = document.getElementById("o-score");
	elm.innerHTML = 0;
	newGame();	
}

function newGame() {
	 move = 0;
	 win = false;
	 board = [["","",""],["","",""],["","",""]];
	 addListeners();	
	var elements = document.getElementsByClassName("board-tile");
	for (var i = 0; i < elements.length; i++) {
		elements[i].innerHTML = i +1;
	}
	switchToHidden("tie-game");
	switchToHidden("player-x-wins");
	switchToHidden("player-o-wins");
	
	turnSwitch(turn);
}

function emptyList() {
	var list = document.getElementById("game-log");
	while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
   }
}

function createLog(textMessage) {
	var node = document.createElement("LI");                 
	var textnode = document.createTextNode(textMessage);         
	node.appendChild(textnode);
	document.getElementById("game-log").appendChild(node);	
}

