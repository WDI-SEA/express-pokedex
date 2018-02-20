
var searchInput = $('#search-input');
var warningPop = $('.warning-pop');

$('.delete-pokemon').on('click', function(e) {
  // e.preventDefault();
  var deleteUrl = $(this).attr('action');
  $.ajax({
    method: 'delete',
    url: deleteUrl
  }).done(function(data) {
    window.location = '/pokemon';
  });
});

searchInput.on('keyup', function() {
  var searchTyping = $('#search-input').val();
  var regExType = /^[a-zA-Z]*$/g;
  if (!regExType.test(searchTyping)) {
    warningPop.popover('enable');
    warningPop.popover('show');
    searchInput.removeClass('right-regex');
    searchInput.addClass('wrong-regex');
  };
});

searchInput.on('keyup', function() {
  var searchTyping = $('#search-input').val();
  var regExType = /^[a-zA-Z]+$/g;
  if (searchInput.hasClass('wrong-regex') && regExType.test(searchTyping)) {
    warningPop.popover('hide');
    warningPop.popover('disable');
    warningPop.attr('data-trigger', 'manual');
    searchInput.removeClass('wrong-regex');
    searchInput.addClass('right-regex');
  };
});

searchInput.on('keyup', function() {
  var searchTyping = $('#search-input').val();
  var regExType = /^$/g;
  if (regExType.test(searchTyping)) {
    warningPop.popover('hide');
    warningPop.popover('disable');
    searchInput.removeClass('wrong-regex right-regex');
  };
});

$('#search-form').on('submit', function(e) {
  e.preventDefault();
  var inputPokemon = searchInput.val();
  var regEx = /^[a-z]+$/g;
  inputPokemon = inputPokemon.toLowerCase();
  if (regEx.test(inputPokemon)) {
    $.ajax({
      method: 'get',
      url: '/pokemon/' + inputPokemon
    }).done(function(data) {
      window.location = '/pokemon/' + inputPokemon;
    });
  } else {
    warningPop.popover('enable');
    warningPop.popover('show');
    searchInput.focus();
    searchInput.removeClass('right-regex');
    searchInput.addClass('wrong-regex');
    searchInput.on('keyup', function() {
    });
  }
});
