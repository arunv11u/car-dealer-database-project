"use strict";

let carImage = null;

document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      carImage = reader.result;
      document.getElementById("uploadedImage").src = carImage;
      document.getElementById("uploadContainer").style.display = "none";
      document.getElementById("imageContainer").style.display = "block";
    };

    reader.readAsDataURL(file);
  });

document
  .getElementById("removeImg")
  .addEventListener("click", function removeImage() {
    carImage = null;
    document.getElementById("uploadContainer").style.display = "block";
    document.getElementById("imageContainer").style.display = "none";
  });
