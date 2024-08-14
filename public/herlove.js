// iz blis
let running = 0;

document.addEventListener("DOMContentLoaded", function () {
  setJesusClickListener();
  getPhase();
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

function toggle(element) {
  const states = { none: "block", block: "none", collapse: "block" };
  element.style.display = states[element.style.display] || "block";
}

function getPhase() {
  try {
    fetch("/services/phases/random")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("her-text").innerText = data;
      });
  } catch (err) {
    document.getElementById("her-text").innerText = "i love you";
  }
}
