
console.log('working right?');
  //Strip the pokemon Id from the url

//location of the Pokemon image assets
var imagesUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'


function getPokemonId(url){

var result =  url.match(/\/\d+/);

return result[0].slice(1);
}

//Pad the pokemon id with leading 0s 








function padId(id){
    switch(true){
        case id.length<10:
            return id.padStart(3, "0");
        case id.length>=10:
            return id.padStart(2, "0");
        case id.length >99:
            return id;           
    }  
}  
