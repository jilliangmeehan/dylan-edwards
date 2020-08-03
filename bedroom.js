// Filter project by category
filterSelection("some")

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("category");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    if (x[i].className.indexOf(c) > -1) {
      addClass(x[i], "show");
    } else {
      removeClass(x[i], "show");
    }
  }
}

function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
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

// Smooth scroll to project
$(document).ready(function(){
$("a").on('click', function(event) {

if (this.hash !== "") {
  event.preventDefault();

  var hash = this.hash;


  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 'slow');
}
});
});

// Show projects on scroll
let titles = document.querySelectorAll("main .titles");
var controller = new ScrollMagic.Controller();

titles.forEach(project => {
  let projectTitle = project.querySelector("h3 a");

  new ScrollMagic.Scene({
    triggerElement: project,
    duration: 100
  })
    .setClassToggle(projectTitle.hash, "current")
    //.addIndicators()
    .addTo(controller);
});
