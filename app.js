const doc_body = document.querySelector('body');
const giraffe_container = document.querySelector('.giraffe');
const giraffe_head = document.querySelector('.giraffe-head');
const giraffe_ear = document.querySelector('.giraffe-ear');
const giraffe_horn1 = document.querySelector('#horn1');
const giraffe_horn2 = document.querySelector('#horn2');
const trigger = document.querySelector('.trigger')

const search_trigger = document.querySelector('.trigger');
const searchbar = document.querySelector('.searchbar-wrapper');
const search_icon = document.querySelector('.search-icon');
const input_field = document.querySelector('#my-address');
const error_container = document.querySelector('.error_container');
const result_El = document.querySelector('#result');
const backButton = document.querySelector('#back');

document.querySelector('body').style.height = `${window.innerHeight}px`

function switchToLanding() {

  // searchbar
  searchbar.style.top = "100px";

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
    trigger.classList.toggle("disabled");

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

  // add button loop
  setTimeout(function() {
    trigger.classList.add("button-loop")
  }, 2000)
};

function switchToResult() {

  // giraffe sink classes
  giraffe_container.classList.add("giraffe-sinks");
  giraffe_head.classList.add("giraffe-head-sinks");

  // searchbar collapses
  searchbar.style.width = `${search_icon.offsetHeight}px`;

  // make giraffe hidden
  setTimeout(function() {
    giraffe_container.style.bottom = "-450px"
  }, 950);

  // searchbar moves back up
  setTimeout(function() {
    searchbar.style.top = "-100px";
  }, 600);

  // remove horn loop
  setTimeout(function() {
    giraffe_horn1.classList.remove("horn-loop");
    giraffe_horn2.classList.remove("horn-loop");
  }, 1000);

  // remove some more stuff
  setTimeout(function() {
    trigger.classList.toggle("disabled");
    giraffe_container.classList.remove("giraffe-sinks");
    giraffe_head.classList.remove("giraffe-head-sinks");
    giraffe_ear.classList.remove("ear-loop");
  }, 1100);
};

// EVENT LISTENERS

search_trigger.addEventListener("click", function() {
  if (input_field.value !== "") {
    codeAddress()
  }
});

document.querySelector('#back').addEventListener("click", function() {
  result_El.style.opacity = "0";
  backButton.style.opacity = "0";
  input_field.value = "";
  switchToLanding();
  setTimeout(function() {
    input_field.focus();
  }, 1000)
})

// init popup
switchToLanding()