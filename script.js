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

function turnSwitch(move) {
	if (move % 2 === 1) {
		switcher = document.getElementById("player-o-ready");
		removeClass(switcher, "hidden");
		addClass(switcher, "visible");
		switcher = document.getElementById("player-x-ready");
		removeClass(switcher, "visible");
		addClass(switcher, "hidden");
	}
	else {
		switcher = document.getElementById("player-o-ready");
		addClass(switcher, "hidden");
		removeClass(switcher, "visible");
		switcher = document.getElementById("player-x-ready");
		removeClass(switcher, "hidden");
		addClass(switcher, "visible");
	}
}

function selectMove() {

	if (turn % 2 === 1) {
		symbol = "O";
	}
	else {
		symbol = "X";
	}
	this.innerHTML = symbol;



  //Populate array
  switch(this.id) {
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

winner();

	if (win) {
		if (turn % 2 === 1){
		switcher = document.getElementById("player-o-ready");
		addClass(switcher, "hidden");
		removeClass(switcher, "visible");
		switcher = document.getElementById("player-o-wins");
		removeClass(switcher, "hidden");
		addClass(switcher, "visible");
		removeListeners();
		var elm = document.getElementById("o-score");
		elm.innerHTML = parseInt(elm.innerHTML) + 1;
		oWinsLog();		
		}
		else {
		switcher = document.getElementById("player-x-ready");
		addClass(switcher, "hidden");
		removeClass(switcher, "visible");	
		switcher = document.getElementById("player-x-wins");
		removeClass(switcher, "hidden");
		addClass(switcher, "visible");	
		removeListeners();
		var elm = document.getElementById("x-score");
		elm.innerHTML = parseInt(elm.innerHTML) + 1;
		switcher = document.getElementById("player-o-ready");
		addClass(switcher, "hidden");
		removeClass(switcher, "visible");	
		xWinsLog();						
		}

	}
	else if (move === 8) {
		switcher = document.getElementById("tie-game");
		removeClass(switcher, "hidden");
		addClass(switcher, "visible");
		switcher = document.getElementById("player-o-ready");
		addClass(switcher, "hidden");
		removeClass(switcher, "visible");
		switcher = document.getElementById("player-x-ready");
		addClass(switcher, "hidden");
		removeClass(switcher, "visible");	
		catsLog();	
	}	
	turn++;
	move++;
	if  (move < 8 && !win) {
		turnSwitch(turn);
	}
	this.removeEventListener("click", selectMove);
}


function winner() {
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
	 move = 0;
	 turn = 0;
	 switcher = "";
	 win = false;
	 symbol = "";
	 board = [["","",""],["","",""],["","",""]];
	 addListeners();
	switcher = document.getElementById("player-x-ready");
	removeClass(switcher, "hidden");
	addClass(switcher, "visible");
	switcher = document.getElementById("player-o-ready");
	removeClass(switcher, "visible");
	addClass(switcher, "hidden");
	switcher = document.getElementById("tie-game");
	removeClass(switcher, "visible");
	addClass(switcher, "hidden");
	switcher = document.getElementById("player-x-wins");
	removeClass(switcher, "visible");
	addClass(switcher, "hidden");
	switcher = document.getElementById("player-o-wins");
	removeClass(switcher, "visible");
	addClass(switcher, "hidden");
	emptyList();

	var elm = document.getElementById("x-score");
	elm.innerHTML = 0;
	var elm = document.getElementById("o-score");
	elm.innerHTML = 0;	
	var elements = document.getElementsByClassName("board-tile");
	for (var i = 0; i < elements.length; i++) {
		elements[i].innerHTML = i +1;
	}
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

	switcher = document.getElementById("tie-game");
	removeClass(switcher, "visible");
	addClass(switcher, "hidden");
	switcher = document.getElementById("player-x-wins");
	removeClass(switcher, "visible");
	addClass(switcher, "hidden");
	switcher = document.getElementById("player-o-wins");
	removeClass(switcher, "visible");
	addClass(switcher, "hidden");	
	turnSwitch(turn);
}

function catsLog() {
	var node = document.createElement("LI");                 
	var textnode = document.createTextNode("Cat's game (tie)");         
	node.appendChild(textnode);
	document.getElementById("game-log").appendChild(node);  

}	

function xWinsLog() {
	var node = document.createElement("LI");                 
	var textnode = document.createTextNode("Player X won");         
	node.appendChild(textnode);
	document.getElementById("game-log").appendChild(node);  

}

function oWinsLog() {
	var node = document.createElement("LI");                 
	var textnode = document.createTextNode("Player O won");         
	node.appendChild(textnode);
	document.getElementById("game-log").appendChild(node);  

}

function emptyList() {
	var list = document.getElementById("game-log");
	debugger;
	while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
   }
}



