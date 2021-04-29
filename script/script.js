document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (navigator.onLine) {
    } else {
      const imagePaths = ["1.jpg", "2.jpg"];
      const image = imagePaths[Math.floor(Math.random() * imagePaths.length)];
      document.getElementById("image").setAttribute("src", `./images/${image}`);
    }
  },
  false
);
