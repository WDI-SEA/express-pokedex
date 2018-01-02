// Flip Card Back Over
// I am not sure why this funciton is not working. I would love some help debugging it and understanding why! Thanks!
var cardFlipped = function (){
	var poke_id = $(this).attr('id');
	var id = poke_id.substring(poke_id.length -1)
	document.getElementById(poke_id).style.display = 'none';
	document.getElementById('cardback-'+id+'').style.display = 'inline-block';
}

// Add Event Listeners to Cards
var reflipCard = function (poke_id) {
	var card_id = 'pokemon-'+poke_id
	var card = document.getElementById(card_id)
	card.addEventListener('click', cardFlipped);
}

// To Show Front of Card
var cardClicked = function (){
	var poke_id = $(this).attr('id');
	document.getElementById('pokemon-'+poke_id+'').style.display = 'inline-block';
	document.getElementById('cardback-'+poke_id+'').style.display = 'none';
	reflipCard(poke_id);
}


// Add Event Listeners to Cards
var addCardEventListeners= function () {
	var cards = document.querySelectorAll('.back-pokecard');
	for(var i =0; i < cards.length; i++){
		cards[i].addEventListener('click', cardClicked);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	addCardEventListeners();
});

        