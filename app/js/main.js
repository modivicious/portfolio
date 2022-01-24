let sectionsAnimStatus = [];

new fullpage("#fullpage", {
  autoScrolling: true,
  scrollingSpeed: 900,
  easingcss3: "cubic-bezier(0.225, 0.1, 0.4, 1)",
  navigation: true,
  navigationPosition: "left",
  loopHorizontal: false,
  controlArrows: false,
  anchors: ["intro", "portfolio", "skills", "contact"],
  animateAnchor: false,
  recordHistory: false,
  onLeave: (origin, destination, direction) => {
    if (localStorage.getItem("isAnimate") !== "false") {
      if (!sectionsAnimStatus[destination.index] && direction === "down") {
        let nextClass = ".fp-section-" + (destination.index + 1);
        gsap.from(
          nextClass + " .anim-text",
          {
            x: "-100%",
            duration: 1,
            delay: .25,
            stagger: .08,
            ease: "power2.out"
          }
        );
        gsap.fromTo(
          nextClass + " .anim-pic",
          {
            x: "100%",
            opacity: "0"
          },
          {
            x: "0",
            opacity: "1",
            duration: 1,
            delay: .25,
            ease: "power2.out"
          }
        );
      }
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
    let sections = document.querySelectorAll(".section");
    sections.forEach((section, i) => {
      let num = i + 1;
      section.classList.add("fp-section-" + num);
    });
  }
});

window.onload = () => {
  gsap.to(
    ".loader",
    {
      y: "-100%",
      delay: .1,
      duration: .7,
      ease: "power2.out"
    }
  );
  if (localStorage.getItem("isAnimate") !== "false") {
    let text = gsap.timeline();
    text.from(
      ".fp-section-1.active .anim-text",
      {
        x: "-100%",
        duration: 1,
        delay: .44,
        stagger: .08,
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
        duration: 1,
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
        delay: 1.2,
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
        delay: 1.57,
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
        delay: 1.57,
        ease: "power2.out"
      }
    );
  }
  else if (localStorage.getItem("isAnimate") === "false")
    animControl.classList.add("anim-control--disabled");
}

let parallax = document.getElementById("parallax");
new Parallax(parallax);

let menuRight = document.querySelector(".menu__rightside");
let menuGroup = document.querySelector(".menu__group");
let menuBtn = document.querySelector(".menu__btn");
let menuLink = document.querySelectorAll(".menu__link");
let animControl = document.querySelector(".anim-control");

menuBtn.addEventListener("click", () => toggleMenu());
menuLink.forEach(link => link.addEventListener("click", () => toggleMenu()));


let prevSlide = document.querySelector(".control__prev");
let nextSlide = document.querySelector(".control__next");

prevSlide.addEventListener("click", () => {
  fullpage_api.setScrollingSpeed(500);
  fullpage_api.moveSlideLeft();
  fullpage_api.setScrollingSpeed(900);
});

nextSlide.addEventListener("click", () => {
  fullpage_api.setScrollingSpeed(500);
  fullpage_api.moveSlideRight();
  fullpage_api.setScrollingSpeed(900);
});

document.addEventListener("click", (e) => {
  if (
    menuRight.classList.contains("menu__rightside--active") && // if menu open
    menuRight !== e.target && // if click was not on our menu
    !menuRight.contains(e.target) && // ...and not on its children
    menuGroup !== e.target && // and click was not on header group
    !menuGroup.contains(e.target) // ...and not on its children
  ) toggleMenu();
});

animControl.addEventListener("click", () => {
  if (localStorage.getItem("isAnimate") !== "false") {
    localStorage.setItem("isAnimate", "false");
    animControl.classList.add("anim-control--disabled");
  }
  else {
    localStorage.setItem("isAnimate", "true");
    animControl.classList.remove("anim-control--disabled");
  }
});


const toggleMenu = () => {
  menuBtn.classList.toggle("menu__btn--active");
  menuRight.classList.toggle("menu__rightside--active");
  menuGroup.classList.toggle("menu__group--active");
  document.body.classList.toggle("hide-overflow");
}

function slideCheck() {
  let slide = fullpage_api.getActiveSlide();
  if (slide !== null) {
    if (slide.isFirst)
      prevSlide.classList.add("disable");
    else prevSlide.classList.remove("disable");
    if (slide.isLast)
      nextSlide.classList.add("disable");
    else nextSlide.classList.remove("disable");
  }
}