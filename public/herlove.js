// iz blis

document.addEventListener("DOMContentLoaded", function () {
  const jesus = document.getElementById("jesus");
  if (jesus) {
    jesus.addEventListener("click", function () {
      // i love you btw idk if ive told u b4
      oldSrc = jesus.src;
      jesus.src = "/gif/stella.gif";
      setTimeout(function () {
        jesus.src = oldSrc;
      }, 2250);
    });
  }
  // lay lady lay
});
