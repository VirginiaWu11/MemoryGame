const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}
let numClicks = 0;
let firstColor = ''; //color
let firstPick = '';
let secondColor = ''; //color
let secondPick = '';
// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	console.log('you just clicked', event.target);

	numClicks++;

	console.log(numClicks);
	if (numClicks === 1) {
		firstPick = event.target;
		firstColor = firstPick.className;
		firstPick.style.backgroundColor = firstPick.className;
		firstPick.removeEventListener('click', handleCardClick);
	}
	else if (numClicks === 2) {
		secondPick = event.target;
		secondColor = secondPick.className;
		console.log(firstColor, secondColor);
		console.log(firstPick);
		secondPick.style.backgroundColor = secondPick.className;
		numClicks = 0;
		// firstPick.addEventListener('click', handleCardClick);

		const allDivs = document.querySelectorAll('div div');
		console.log(allDivs);
		for (let div of allDivs) {
			div.removeEventListener('click', handleCardClick);
		}
		setTimeout(function() {
			for (let div of allDivs) {
				div.addEventListener('click', handleCardClick);
			}
		}, 1000);

		if (firstColor !== secondColor) {
			setTimeout(function() {
				firstPick.style.backgroundColor = '';
				secondPick.style.backgroundColor = '';
			}, 1000);
		}
		else numClicks = 0;

		// if it doesn't match, setTimeout
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
