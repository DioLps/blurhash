const { encode } = require("blurhash");
const sharp = require("sharp");

const _getImageData = async (image) => {
  const { data, info } = await sharp(image)
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: "inside" })
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  return {
    data: new Uint8ClampedArray(data),
    width,
    height,
  };
};

const getHash = async (image) => {
  const imageData = await _getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

module.exports = {
  getHash,
};
