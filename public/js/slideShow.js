// To View angles of Pokemon

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    x[slideIndex-1].style.display = "block"; 
}

// To Change from Back to front of Card

function flipCard(){
	document.getElementById('pokecard').style.display = 'block';
	document.getElementById('back-pokecard').style.display = 'none';
}

// Load Page Content
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('pokecard').style.display = 'none';
});

/// Random BackDrop for Pokemon

var backgrounds = ["/img/sprite_back1.jpeg", "/img/sprite_back2.jpg", "/img/sprite_back3.jpg"];

function getRandomImage(){
    var rnd = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[rnd];
}

function changeImage(){
    var img = document.querySelector(".w3-content");
    img.src = getRandomImage();
}

function init(){
    var el = document.querySelector(".w3-content");
    el.onclick = changeImage;
}

window.onload = init;