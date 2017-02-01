
const config = {
  apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
  authDomain: "tic-tac-toe-firebase.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
  storageBucket: "tic-tac-toe-firebase.appspot.com",
  messagingSenderId: "315055648875"
};

firebase.initializeApp(config);

/*********************************
variable declarations
*********************************/

let currentGame;
let currentSeatOne;
let currentSeatTwo;
let turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
const gamesRef = firebase.database().ref('games')
let userRef = firebase.database().ref('games/' + currentGame + '/users')
let i = 0
let winner = ""

let i = 0;

function makeMove() {
	if (this.innerHTML === '') {
		let square = $(this).attr('id')
		let turn;
		if ((i % 2) === 0 || i === 0) {
			turn = '<span class="letter">X</span>'
			$(this).html(turn)
			i++
			return turnsRef.update({ [square] : 'X' })
		} else {
			turn = '<span class="letter">O</span>'
			$(this).html(turn)
			i++
			return turnsRef.update({ [square] : 'O' })
		}
	}
}


function newGame() {
	let removeGame = { [currentGame] : null }
	gamesRef.update(removeGame)
	const newBoard = { turns : ["", "", "", "", "", "", "", "", ""] }
	document.querySelectorAll('.square').forEach(function(square) {
		square.innerText = null
	})
	gamesRef.push(newBoard)
	  .then(data => currentGame = data.path.o[1])
	  .then(() => {
	  	turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
	  	userRef = firebase.database().ref('games/' + currentGame + '/users')
	})
	i = 0;
}

$('.seat').click(function(e) {
	$(this).html('Seat Taken')
	$(this).removeClass('btn-default')
	$(this).addClass('btn-primary')
	if (document.querySelector('.seatOne').innerHTML === 'Seat Taken' && document.querySelector('.seatTwo').innerHTML === 'Seat Taken') {
		userRef.update({twoplayers : true})
	}
})

/*********************************
functions
*********************************/

function winCheck(boardstate) {
  // checks rows for O win
  if (boardstate[0] && boardstate[1] && boardstate[2] === "O") {
    winner = "O"
    return true
  } else if (boardstate[3] && boardstate[4] && boardstate[5] === "O") {
    winner = "O"
    return true
  } else if (boardstate[6] && boardstate[7] && boardstate[8] === "O") {
    winner = "O"
    return true
  // checks diags for O win
  } else if (boardstate[0] && boardstate[4] && boardstate[8] === "O") {
    winner = "O"
    return true
  } else if (boardstate[2] && boardstate[4] && boardstate[6] === "O") {
    winner = "O"
    return true
  // checks cols for O win
  } else if (boardstate[0] && boardstate[3] && boardstate[6] === "O") {
    winner = "O"
    return true
  } else if (boardstate[1] && boardstate[4] && boardstate[7] === "O") {
    winner = "O"
    return true
  } else if (boardstate[2] && boardstate[5] && boardstate[8] === "O") {
    winner = "O"
    return true
  // checks rows for X win
  } else  if (boardstate[0] && boardstate[1] && boardstate[2] === "X") {
    winner = "X"
    return true
  } else if (boardstate[3] && boardstate[4] && boardstate[5] === "X") {
    winner = "X"
    return true
  } else if (boardstate[6] && boardstate[7] && boardstate[8] === "X") {
    winner = "X"
    return true
  // checks diags for X win
  } else if (boardstate[0] && boardstate[4] && boardstate[8] === "X") {
    winner = "X"
    return true
  } else if (boardstate[2] && boardstate[4] && boardstate[6] === "X") {
    winner = "X"
    return true
  // checks cols for X win
  } else if (boardstate[0] && boardstate[3] && boardstate[6] === "X") {
    winner = "X"
    return true
  } else if (boardstate[1] && boardstate[4] && boardstate[7] === "X") {
    winner = "X"
    return true
  } else if (boardstate[2] && boardstate[5] && boardstate[8] === "X") {
    winner = "X"
    return true
  }
}

function onUpdate(snap) {
  const data = snap.val()
  const turns = data.turns
  console.log('turns', turns)
  if(winCheck(turns)) {
    alert(`${winner} Won!`)
  }
}

/*********************************
event listeners
*********************************/

// user clicks on square
$('.square').click(makeMove)

// user clicks new game button
$('.new-game').click(newGame)

gamesRef.on('child_changed', onUpdate)



/*********************************
starts a new game as soon as app starts
*********************************/

newGame();
