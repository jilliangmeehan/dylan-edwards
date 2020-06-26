// Nav scrolling
let mainNavLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    let videoLink = section.querySelector("a");
    let iframe = section.querySelector("iframe");
    let player = new Vimeo.Player(iframe);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      player.play();
      link.classList.add("current");
      iframe.classList.add("visible", "animated", "fadeIn");
      videoLink.classList.add("visible");
    } else {
      player.pause();
      link.classList.remove("current");
      iframe.classList.remove("visible", "animated", "fadeIn");
      videoLink.classList.remove("visible");
    }
  });
});

// Filter
filterSelection("some")

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("category");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
  //element.classList.add('animated', 'fadeInUp')
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
  //element.classList.add('animated', 'fadeInUp')
}

var btnContainer = document.getElementById("categories-btns");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Toggle categories
function toggleCategories() {
  var x = document.getElementById("toggleCategories");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// Smooth scroll to project
$(document).ready(function(){
$("a").on('click', function(event) {

if (this.hash !== "") {
  event.preventDefault();

  var hash = this.hash;


  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 500, function(){

    window.location.hash = hash;
  });
}
});
});
