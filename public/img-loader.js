const targetImg = document.querySelector("#loaded-img");
const placeholderImg = document.querySelector("#placeholder-img");
const imgFileInput = document.querySelector("#img-file");

function onLoadRequest() {
  _resetSrcAndStyles();
  fetch("/banner-metadata")
    .then((res) => res.json())
    .then((res) => {
      const width = 32;
      const height = 32;
      const blurhashImgData = blurhash.decode(res.hash, width, height);
      const canvas = blurhash.drawImageDataOnNewCanvas(
        blurhashImgData,
        width,
        height
      );

      placeholderImg.src = canvas.toDataURL();
      targetImg.src = res.url;
      targetImg.onload = _setTargetVisible;
    });
}

function _resetSrcAndStyles() {
  targetImg.src = "";
  targetImg.onload = null;
  placeholderImg.src = "";
  placeholderImg.classList.remove("lazy-img__placeholder--hide");
}

function _setTargetVisible() {
  placeholderImg.classList.add("lazy-img__placeholder--hide");
}

function submit(e) {
  const file = e.target.files[0];
  const data = new FormData();
  data.append("file", file);
  fetch("/api/upload", {
    method: "POST",
    body: data,
  }).then(function () {
    imgFileInput.value = null;
  });
}
