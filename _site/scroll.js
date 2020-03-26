// Nav scrolling
let mainNavLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    let videoLink = section.querySelector("a");
    let thumbnail = section.querySelector("img");
    let iframe = section.querySelector("iframe");
    let player = new Vimeo.Player(iframe);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
      iframe.classList.add("visible");
      videoLink.classList.add("visible");
      player.play();
    } else {
      link.classList.remove("current");
      iframe.classList.remove("visible");
      videoLink.classList.remove("visible");
      player.pause();
    }
  });
});
