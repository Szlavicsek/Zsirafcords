// const doc_body = document.querySelector('body');
const giraffe_container = document.querySelector('.giraffe');
const giraffe_head = document.querySelector('.giraffe-head');
const giraffe_ear = document.querySelector('.giraffe-ear');
const giraffe_horn1 = document.querySelector('#horn1');
const giraffe_horn2 = document.querySelector('#horn2');

const search_trigger = document.querySelector('.trigger');
const searchbar = document.querySelector('.searchbar-wrapper');
const search_icon = document.querySelector('.search-icon');
const input_field = document.querySelector('#my-address');
const error_container = document.querySelector('.error_container');
const result_El = document.querySelector('#result');

const carousel = document.querySelector("#demos");
const carousel_items = Array.from(document.getElementsByClassName('item'));
const carousel_inners = Array.from(document.getElementsByClassName('item'));
const pulsing_containers = Array.from(document.getElementsByClassName('pulse'))
const pulsing_circles = Array.from(document.querySelectorAll('circle'))

document.querySelector('body').style.height = `${window.innerHeight}px`


function phase0_showLandingPage() {

  // adjust searchbar distance from top to innerHeight
  switch (true) {
    case window.innerHeight > 600:
      searchbar.style.top = "100px";
      break;
    case window.innerHeight <= 500:
      searchbar.style.top = "40px";
      break;
    case window.innerHeight <= 600:
      searchbar.style.top = "70px";
      break;
  }

  // giraffe
  giraffe_container.style.bottom = "0px";
  giraffe_container.classList.add("giraffe-popup");
  giraffe_head.classList.add("giraffe-head-popup");

  // ear and horn
  giraffe_ear.classList.add("ear-popup");
  giraffe_horn1.classList.add("giraffe-horn1-popup");
  giraffe_horn2.classList.add("giraffe-horn2-popup");

  // searchbar lands on its place
  setTimeout(function() {
    searchbar.style.width = "80%";
  }, 800);

  // remove popups and add giraffe loops
  setTimeout(function() {
    search_trigger.classList.toggle("disabled");

    // giraffe
    giraffe_container.classList.remove("giraffe-popup");
    giraffe_head.classList.remove("giraffe-head-popup");

    // ear
    giraffe_ear.classList.remove("ear-popup");
    giraffe_ear.classList.add("ear-loop");

    // horn
    giraffe_horn1.classList.remove("giraffe-horn1-popup");
    giraffe_horn2.classList.remove("giraffe-horn2-popup");
    giraffe_horn1.classList.add("horn-loop");
    giraffe_horn2.classList.add("horn-loop");
  }, 1100);
};


function phase1_hideGiraffeAndMoveSearchbarUp() {

  // giraffe sink classes
  giraffe_container.classList.add("giraffe-sinks");
  giraffe_head.classList.add("giraffe-head-sinks");

  // searchbar shrinks
  search_icon.style.transition = "0.8s";
  searchbar.style.height = "40px";
  search_icon.style.height = "40px";
  search_icon.style.width = "40px";
  input_field.style.width = "calc(100% - 60px)";
  input_field.style.marginLeft = "20px";

  // searchbar moves back up
  setTimeout(function() {
    searchbar.style.top = "25px";
    input_field.style.fontSize = "1rem";
    searchbar.style.width = "90%";
  }, 200);

  // make giraffe hidden
  setTimeout(function() {
    giraffe_container.style.bottom = "-450px";
    // searchbar.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
  }, 950);

  // remove horn loop
  setTimeout(function() {
    giraffe_horn1.classList.remove("horn-loop");
    giraffe_horn2.classList.remove("horn-loop");
  }, 1000);

  // remove some more stuff
  setTimeout(function() {
    search_trigger.classList.toggle("disabled");
    giraffe_container.classList.remove("giraffe-sinks");
    giraffe_head.classList.remove("giraffe-head-sinks");
    giraffe_ear.classList.remove("ear-loop");
  }, 1100);
};

function phase2_showCarouselAndPopupGiraffe() {
  document.querySelector('#demos').style.opacity = "1";
  document.querySelector('.pac-container').style.marginTop = "-5px";
  document.querySelector('.pac-container').style.backgroundColor = "white";

  setTimeout(function() {
    // giraffe
    $(':root').css('--giraffe-scale', 'scale(1)');
    giraffe_container.style.bottom = "-150px";
    giraffe_container.style.left = "50px";
    giraffe_container.classList.add("giraffe-popup");
    giraffe_head.classList.add("giraffe-head-popup");

    // ear and horn
    giraffe_ear.classList.add("ear-popup");
    giraffe_horn1.classList.add("giraffe-horn1-popup");
    giraffe_horn2.classList.add("giraffe-horn2-popup");

    // remove popups and add giraffe loops
    setTimeout(function() {
      search_trigger.classList.toggle("disabled");

      // giraffe
      giraffe_container.classList.remove("giraffe-popup");
      giraffe_head.classList.remove("giraffe-head-popup");

      // ear
      giraffe_ear.classList.remove("ear-popup");
      giraffe_ear.classList.add("ear-loop");

      // horn
      giraffe_horn1.classList.remove("giraffe-horn1-popup");
      giraffe_horn2.classList.remove("giraffe-horn2-popup");
      giraffe_horn1.classList.add("horn-loop");
      giraffe_horn2.classList.add("horn-loop");
    }, 1100);
  }, 500)
}

// EVENT LISTENERS

search_trigger.addEventListener("click", function() {
  if (input_field.value !== "") {
    codeAddress()
  }
});

window.addEventListener("resize", function() {
  if (window.innerHeight > 350) {
    document.querySelector('body').style.height = `${window.innerHeight}px`
  }
})

// init popup
phase0_showLandingPage()