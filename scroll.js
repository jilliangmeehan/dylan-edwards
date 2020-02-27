// Nav scrolling
let mainNavLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    let video = section.querySelector("a");
    let animatedImage = section.querySelector("img");

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
      animatedImage.classList.add("visible");
      video.classList.add("visible");
    } else {
      link.classList.remove("current");
      animatedImage.classList.remove("visible");
      video.classList.remove("visible");
    }
  });
});
