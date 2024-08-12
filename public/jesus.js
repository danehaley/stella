class Jesus {
  isRunning = 0;
  // the jesus element
  jesusElement = null;

  async Jesus(id) {
    const jesusElement = document.getElementById(id);

    // Example of waiting for an image to load
    await new Promise((resolve) => {
      if (jesusElement.complete) {
        resolve(); // Image already loaded
      } else {
        jesusElement.onload = resolve; // Resolve promise when image loads
      }
    });
  }

  async Jesus() {
    try {
      const jesusElement = document.getElementById("jesus");

      // Example of waiting for an image to load
      await new Promise((resolve) => {
        if (jesusElement.complete) {
          resolve(); // Image already loaded
        } else {
          jesusElement.onload = resolve; // Resolve promise when image loads
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  setJesusClickListener() {
    if (this.jesusElement) {
      this.jesusElement.addEventListener("click", () => {
        if (!this.isRunning) {
          this.isRunning = 1;
          // i love you btw idk if ive told u b4
          this.jesusElement.src = "/gif/stella.gif";
          setTimeout(() => {
            this.jesusElement.src = "/gif/djJesusNestlesHisLilLamb.gif";
            this.isRunning = 0;
          }, 2250);
        }
      });
    }
  }
}
