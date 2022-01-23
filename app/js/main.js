let sectionsAnimStatus = [];

new fullpage('#fullpage', {
  autoScrolling: true,
  scrollingSpeed: 1000,
  easingcss3: "cubic-bezier(0.525, 0.05, 0.4, 1)",
  navigation: true,
  navigationPosition: 'left',
  loopHorizontal: false,
  controlArrows: false,
  anchors: ['intro', 'portfolio', 'skills', 'contact'],
  animateAnchor: false,
  recordHistory: false,
  onLeave: (origin, destination, direction) => {
    if (!sectionsAnimStatus[destination.index] && direction === "down") {
      let nextClass = ".fp-section-" + (destination.index + 1);
      gsap.from(
        nextClass + " .anim-text",
        {
          x: "-100%",
          duration: .8,
          delay: .42,
          stagger: .3,
          ease: "power2.out"
        }
      );
    }
    sectionsAnimStatus[destination.index] = true;
  },
  afterLoad() {
    slideCheck();
  },
  afterSlideLoad() {
    slideCheck();
  },
  afterRender: () => {
    let sections = document.querySelectorAll('.section');
    sections.forEach((section, i) => {
      let num = i + 1;
      section.classList.add("fp-section-" + num);
    });
  }
});

window.onload = () => {
  let text = gsap.timeline();
  gsap.to(
    ".loader",
    {
      y: "-100%",
      delay: .1,
      duration: .7,
      ease: "power2.out"
    }
  );
  text.from(
    ".fp-section-1.active .anim-text",
    {
      x: "-100%",
      duration: .8,
      delay: .45,
      stagger: .2,
      ease: "power2.out"
    }
  );
  gsap.fromTo(
    ".fp-section-1.active .parallax__el--circle",
    {
      x: "100%",
      opacity: "0"
    },
    {
      x: "0",
      opacity: "1",
      duration: .8,
      delay: .4,
      ease: "power2.out"
    }
  );
  gsap.fromTo(
    ".fp-section-1.active .parallax__el--page",
    {
      opacity: "0"
    },
    {
      opacity: "1",
      duration: .32,
      delay: .95,
      ease: "none"
    }
  );
  gsap.fromTo(
    ".fp-section-1.active .parallax__el--left",
    {
      x: "-30%",
      opacity: "0"
    },
    {
      x: "0",
      opacity: "1",
      duration: .6,
      delay: 1.37,
      ease: "power2.out"
    }
  );
  gsap.fromTo(
    ".fp-section-1.active .parallax__el--right",
    {
      x: "30%",
      opacity: "0"
    },
    {
      x: "0",
      opacity: "1",
      duration: .6,
      delay: 1.32,
      ease: "power2.out"
    }
  );
}

let parallax = document.getElementById('parallax');
new Parallax(parallax);

let menuList = document.querySelector('.menu__list');
let menuGroup = document.querySelector('.menu__group');
let menuBtn = document.querySelector(".menu__btn");
let menuLink = document.querySelectorAll(".menu__link");

menuBtn.addEventListener("click", () => toggleMenu());
menuLink.forEach(link => link.addEventListener("click", () => toggleMenu()));


let prevSlide = document.querySelector(".control__prev");
let nextSlide = document.querySelector(".control__next");

prevSlide.addEventListener("click", () => {
  fullpage_api.setScrollingSpeed(600);
  fullpage_api.moveSlideLeft();
  fullpage_api.setScrollingSpeed(1000);
});

nextSlide.addEventListener("click", () => {
  fullpage_api.setScrollingSpeed(600);
  fullpage_api.moveSlideRight();
  fullpage_api.setScrollingSpeed(1000);
});

document.addEventListener("click", (e) => {
  if (
    menuList.classList.contains("menu__list--active") && // if menu open
    menuList !== e.target && // if click was not on our menu
    !menuList.contains(e.target) && // ...and not on its children
    menuGroup !== e.target && // and click was not on header group
    !menuGroup.contains(e.target) // ...and not on its children
  ) toggleMenu();
});


const toggleMenu = () => {
  menuBtn.classList.toggle("menu__btn--active");
  menuList.classList.toggle("menu__list--active");
  menuGroup.classList.toggle("menu__group--active");
  document.body.classList.toggle("hide-overflow");
}

function slideCheck() {
  let slide = fullpage_api.getActiveSlide();
  if (slide !== null) {
    if (slide.isFirst)
      prevSlide.classList.add('disable');
    else prevSlide.classList.remove('disable');
    if (slide.isLast)
      nextSlide.classList.add('disable');
    else nextSlide.classList.remove('disable');
  }
}