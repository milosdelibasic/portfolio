/* Animation on Scroll initialization */
AOS.init({
  easing: "ease-out-sine",
});
window.addEventListener("load", AOS.refresh);

/* Theme Switcher */
let themeDots = document.getElementsByClassName("about-theme-dot");

let theme = localStorage.getItem("theme");

if (theme == null) {
  setTheme("gray");
} else {
  setTheme(theme);
}

for (var i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener("click", function () {
    let mode = this.dataset.mode;
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == "gray") {
    document.getElementById("theme-style").href = "css/main.min.css";
    document.getElementById("gray").style.transform = "scale(1.4)";
    document.getElementById("gray-foot").style.transform = "scale(1.4)";
    document.getElementById("gray").style.border =
      "3px solid var(--color-light)";
    document.getElementById("red").style.border =
      "2px solid var(--color-light)";
    document.getElementById("gray-foot").style.border =
      "3px solid var(--color-light)";
    document.getElementById("red-foot").style.border =
      "2px solid var(--color-light)";
    document.getElementById("red").style.transform = "scale(1)";
    document.getElementById("red-foot").style.transform = "scale(1)";
  }
  if (mode == "red") {
    document.getElementById("theme-style").href = "css/red.css";
    document.getElementById("red").style.transform = "scale(1.4)";
    document.getElementById("red-foot").style.transform = "scale(1.4)";
    document.getElementById("red").style.border =
      "3px solid var(--color-light)";
    document.getElementById("gray").style.border =
      "2px solid var(--color-light)";
    document.getElementById("red-foot").style.border =
      "3px solid var(--color-light)";
    document.getElementById("gray-foot").style.border =
      "2px solid var(--color-light)";
    document.getElementById("gray").style.transform = "scale(1)";
    document.getElementById("gray-foot").style.transform = "scale(1)";
  }

  localStorage.setItem("theme", mode);
}

/* Navigation */
const navMob = document.getElementById("navigation-mobile");
const navigation = document.getElementById("navigation");
const navItems = document.getElementsByClassName("navigation-list-item");
const main = document.getElementById("main");

function disable() {
  navigation.style.transform = "translateX(100%)";
  navigation.style.opacity = 0;
  document.getElementById("main").style.filter = "blur(0)";
  enableScroll();
}

function toggle() {
  if (navMob.classList.contains("navigation-mobile-open")) {
    navigation.style.transform = "translateX(0)";
    navigation.style.opacity = 1;
    main.style.filter = "blur(10px)";
    main.addEventListener("click", () => {
      navMob.classList.remove("navigation-mobile-open");
      disable();
    });

    disableScroll();
  } else {
    disable();
  }
}

navMob.addEventListener("click", () => {
  navMob.classList.toggle("navigation-mobile-open");
  toggle();
});

Object.keys(navItems).forEach((key) => {
  navItems[key].addEventListener("click", () => {
    if (navMob.classList.contains("navigation-mobile-open")) {
      navMob.classList.remove("navigation-mobile-open");
      toggle();
    }
  });
});

/* Disable scrolling */

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}
