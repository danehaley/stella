// iz blis
let running = 0;

document.addEventListener("DOMContentLoaded", function () {
  setJesusClickListener();
  setPhaseNavigationListeners();
  getPhase("init");
  setupKeyboardNavigation();
  // lay lady lay
});

function setJesusClickListener() {
  const jesus = document.getElementById("jesus");
  const bunny = document.getElementById("bunny");
  jesus.style.display = "block";
  bunny.style.display = "none";

  if (jesus) {
    jesus.addEventListener("click", function () {
      if (!running) {
        running = 1;
        // i love you btw idk if ive told u b4
        toggle(jesus);
        toggle(bunny);
        setTimeout(function () {
          toggle(jesus);
          toggle(bunny);
          running = 0;
        }, 2000);
      }
    });
  }
}

function setPhaseNavigationListeners() {
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  if (next) {
    next.addEventListener("click", function () {
      next.classList.add("border-slate-800");
      getPhase("next");
      next.classList.add("border-slate-950");
    });
  }
  if (prev) {
    prev.addEventListener("click", function () {
      next.classList.add("border-slate-800");
      getPhase("prev");
      next.classList.add("border-slate-950");
    });
  }
}

function toggle(element) {
  const states = { none: "block", block: "none", collapse: "block" };
  element.style.display = states[element.style.display] || "block";
}

function getPhase(direction) {
  try {
    fetch("/services/phases/nav?direction=" + direction)
      .then((response) => response.text())
      .then((data) => {
        phase = JSON.parse(data);
        document.getElementById("her-text").innerText = "☩ " + phase.string + " ☩";
      });
  } catch (err) {
    document.getElementById("her-text").innerText = "☩ i love you ☩";
  }
}

function getToday() {
  fetch("/services/phases/today")
    .then((response) => response.text())
    .then((data) => {
      phase = JSON.parse(data);
      document.getElementById("her-text").innerText = "☩ " + phase.string + " ��";
    });
}

function setupKeyboardNavigation() {
  window.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowRight":
        getPhase("next");
        break;
      case "ArrowLeft":
        getPhase("prev");
        break;
      default:
        // Optionally, handle other keys or ignore them
        break;
    }
  });
}
