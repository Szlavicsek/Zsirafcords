// carousel settings
$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
    items: 2,
    stagePadding: 40,
    loop: false,
    center: true,
    margin: 10,
    callbacks: true,
    URLhashListener: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 25,
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
});
$('.owl-carousel').on('mousewheel', '.owl-stage', function(e) {
  if (e.deltaY > 0) {
    $('.owl-carousel').trigger('next.owl');
  } else {
    $('.owl-carousel').trigger('prev.owl');
  }
  e.preventDefault();
});

// animation: scroll 10s linear infinite
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function runClouds() {
  const clouds = Array.from(document.getElementsByClassName('cloud'));
  clouds.forEach((cloud, index) => {
    if (index % 3 === 0) {
      cloud.style.width = `${cloud.offsetWidth * 0.7}px`
      cloud.style.bottom = "0px"
    } else if (index % 4 === 0) {
      cloud.style.width = `${cloud.offsetWidth * 0.5}px`
      cloud.style.bottom = "5px"
    }
    cloud.style.animation = `scroll ${randomIntFromInterval(10, 40)}s linear infinite`
  })
};