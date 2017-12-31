// Add Event Listeners to Cards
var reflipCard = function (poke_id) {

	document.getElementById('pokemon-'+poke_id+'').style.display = 'none';
	document.getElementById('cardback-'+poke_id+'').style.display = 'inline';
}

// To Show Front of Card
var cardClicked = function (){

	var poke_id = $(this).attr('id');
	document.getElementById('pokemon-'+poke_id+'').style.display = 'inline-block';
	document.getElementById('cardback-'+poke_id+'').style.display = 'none';
	//reflipCard(poke_id);

}


// Add Event Listeners to Cards
var addCardEventListeners= function () {
	var cards = document.querySelectorAll('.back-pokecard');
	for(var i =0; i < cards.length; i++){
		cards[i].addEventListener('click', cardClicked);
	}
}

//
document.addEventListener("DOMContentLoaded", function() {
	//document.getElementById('reset').addEventListener('click', reset);
	addCardEventListeners();
});

        