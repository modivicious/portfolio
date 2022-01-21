new fullpage('#fullpage', {
  autoScrolling: true,
  scrollingSpeed: 900,
  navigation: true,
  navigationPosition: 'left',
  loopHorizontal: false,
  anchors: ['intro', 'portfolio', 'skills', 'contact'],
  recordHistory: false,
  onLeave: (origin, destination, direction) => {
    let tl = gsap.timeline({ delay: 0.3 });
    let nextClass = ".fp-section-" + (destination.index + 1);
    tl.fromTo(
      nextClass + " .anim-text",
      {
        x: "-100%",
      },
      {
        x: "0",
        delay: (i) => {
          return i * 0.4
        },
        duration: 0.85,
        ease: "power2.out",
      });
  },
  afterRender: () => {
    let sections = document.querySelectorAll('.section');
    sections.forEach((section, i) => {
      let num = i + 1;
      section.classList.add("fp-section-" + num);
    });
  }
});

window.addEventListener("load", () => {
  let tl = gsap.timeline({ delay: 0.1 });
  tl.fromTo(
    ".active .anim-text",
    {
      x: "-100%",
    },
    {
      x: "0",
      delay: (i) => {
        return i * 0.4
      },
      duration: 0.85,
      ease: "power2.out",
    });

});

let parallax = document.getElementById('parallax');
new Parallax(parallax);

let menuList = document.querySelector('.menu__list');
let menuGroup = document.querySelector('.menu__group');
let menuBtn = document.querySelector(".menu__btn");
let menuLink = document.querySelectorAll(".menu__link");

menuBtn.addEventListener("click", () => toggleMenu());
menuLink.forEach(link => link.addEventListener("click", () => toggleMenu()));

const toggleMenu = () => {
  menuBtn.classList.toggle("menu__btn--active");
  menuList.classList.toggle("menu__list--active");
  menuGroup.classList.toggle("menu__group--active");
  document.body.classList.toggle("hide-overflow");
}

document.addEventListener("click", (e) => {
  if (
    menuList.classList.contains("menu__list--active") && // if menu open
    menuList !== e.target && // if click was not on our menu
    !menuList.contains(e.target) && // ...and not on its children
    menuGroup !== e.target && // and click was not on header group
    !menuGroup.contains(e.target) // ...and not on its children
  ) toggleMenu();
});