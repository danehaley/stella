// iz blis
let running = 0;

document.addEventListener("DOMContentLoaded", function () {
  setJesusClickListener();
  // lay lady lay
});

function setJesusClickListener() {
  const jesus = document.getElementById("jesus");

  if (jesus) {
    jesus.addEventListener("click", function () {
      if (!running) {
        running = 1;
        // i love you btw idk if ive told u b4
        jesus.src = "/gif/stella.gif";
        setTimeout(function () {
          jesus.src = "/gif/djJesusNestlesHisLilLamb.gif";
          running = 0;
        }, 2250);
      }
    });
  }
}
