

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.carousel');
  let instances = M.Carousel.init(elems, {
    indicators: true,
    noWrap: true,
    numVisible: 8,
    padding: 60,
    shift: 75
  });
});

// console.log('Ready!');