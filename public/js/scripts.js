$('.delete-link').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    console.log(url);
    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function() {
      window.location = '/pokemon';
    });
});

var colors = {
  fairy: [['pink','lighten-3'],'/img/fairy.png'],
  dragon: [["indigo", "darken-4"],"/img/dragon.png"],
  ice: [["blue",'lighten-2'],'/img/ice.png'],
  fire: [['red','lighten-1'],"/img/fire.png"],
  psychic: [['purple','lighten-1'], '/img/pyschic.png'],
  electric: [['yellow','accent-2'], '/img/electric.png'],
  grass: [["light-green",'lighten-1'],'/img/grass.png'],
  water: [['light-blue','lighten-2'],'/img/water.png'],
  ghost: [['blue-grey','lighten-5'],'/img/ghost.png'],
  bug: [['green','darken-4'],'/img/bug.png'],
  rock: [['blue-grey','lighten-3'],'/img/rock.png'],
  ground: [['brown','darken-2'],'/img/ground.png'],
  poison: [['deep-purple','darken-2'],'/img/poison.png'],
  flying: [['light-blue','accent-2'],'/img/flying.png'],
  fighting: [['brown','lighten-1'],'/img/fighting.png'],
  normal: [['grey','darken-1'],'/img/normal.png']
};
var color ='';
var icon ='';

$(document).ready(function(){
      $('.carousel').carousel();
      $(".button-collapse").sideNav();
      var types = $('.types');
      for(var i = 0; i < types.length; i++){
        console.log($(types[i]).attr('id'));
        var type = $(types[i]).attr('id');
        if(colors.hasOwnProperty(type)) {
          console.log(colors[type][0]);
          $('#'+type+'').addClass(colors[type][0][0]+'-text');
          $('#'+type+'').addClass('text-'+colors[type][0][1]);
          $('.'+type+'').attr('src', colors[type][1]);
        } else {
          color = 'grey';
        }
      };
});
