(function () {
  gsap.config({ nullTargetWarn: false });

  let sectionsAnimStatus = [];

  new fullpage("#fullpage", {
    autoScrolling: true,
    scrollingSpeed: 900,
    easingcss3: "cubic-bezier(0.225, 0.1, 0.4, 1)",
    navigation: true,
    navigationPosition: "left",
    loopHorizontal: false,
    controlArrows: false,
    anchors: ["intro", "portfolio", "about", "skills", "contact"],
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
              delay: .2,
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
              delay: .2,
              ease: "power2.out"
            }
          );
        }
      }
      sectionsAnimStatus[destination.index] = true;
    },
    afterLoad() {
      slideDisableCheck();
      setCurrentSlideIndex();
    },
    afterSlideLoad() {
      slideDisableCheck();
      setCurrentSlideIndex();
    },
    afterRender: () => {
      const sections = document.querySelectorAll(".section");
      sections.forEach((section, i) => {
        let num = i + 1;
        section.classList.add("fp-section-" + num);
      });
      const numberOfSlides = document.querySelectorAll(".fp-slide");
      document.querySelector(".control__total").innerHTML = numberOfSlides.length - 1;
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
    else if (localStorage.getItem("isAnimate") === "false") {
      animControl.classList.add("anim-control--disabled");
      animControl.innerHTML = "Анимация: отключена";
    }
  }

  const parallax = document.getElementById("parallax");
  new Parallax(parallax);

  const menuRight = document.querySelector(".menu__rightside");
  const menuGroup = document.querySelector(".menu__group");
  const menuBtn = document.querySelector(".menu__btn");
  const menuLink = document.querySelectorAll(".menu__link");
  const animControl = document.querySelector(".anim-control");

  menuBtn.addEventListener("click", () => toggleMenu());
  menuLink.forEach(link => link.addEventListener("click", () => toggleMenu()));

  const prevSlide = document.querySelector(".control__prev");
  const nextSlide = document.querySelector(".control__next");

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

  document.addEventListener("click", e => {
    if (
      menuRight.classList.contains("menu__rightside--active") &&
      !menuRight.contains(e.target) &&
      !menuGroup.contains(e.target)
    ) toggleMenu();
    if (
      stackList.classList.contains("skills__wrapper--active") &&
      !stackList.querySelector(".skills__stack").contains(e.target) &&
      !showBtn.contains(e.target)
    ) stackList.classList.toggle("skills__wrapper--active");
  });

  animControl.addEventListener("click", () => {
    if (localStorage.getItem("isAnimate") !== "false") {
      animControl.classList.add("anim-control--disabled");
      animControl.innerHTML = "Анимация: отключена";
      localStorage.setItem("isAnimate", "false");
    }
    else {
      animControl.classList.remove("anim-control--disabled");
      animControl.innerHTML = "Анимация: включена";
      localStorage.setItem("isAnimate", "true");
    }
  });

  const toggleMenu = () => {
    menuBtn.classList.toggle("menu__btn--active");
    menuRight.classList.toggle("menu__rightside--active");
    menuGroup.classList.toggle("menu__group--active");
  };

  function slideDisableCheck() {
    const slide = fullpage_api.getActiveSlide();
    if (slide !== null) {
      if (slide.isFirst)
        prevSlide.classList.add("disable");
      else prevSlide.classList.remove("disable");
      if (slide.isLast)
        nextSlide.classList.add("disable");
      else nextSlide.classList.remove("disable");
    }
  }

  function setCurrentSlideIndex() {
    const currentSlide = fullpage_api.getActiveSlide();
    if (currentSlide)
      document.querySelector(".control__current").innerHTML = currentSlide.index;
  }

  const showBtn = document.querySelector(".skills__show-btn");
  const stackList = document.querySelector(".skills__wrapper");

  showBtn.addEventListener("click", function () {
    stackList.classList.toggle("skills__wrapper--active");
  });
})()