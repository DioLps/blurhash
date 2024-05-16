const { readdir, unlink, writeFile } = require("node:fs/promises");
const path = require("node:path");

const resetDir = async (directory = "./public/imgs/") => {
  for (const file of await readdir(directory)) {
    await unlink(path.join(directory, file));
  }
};

const saveImgToPublic = async (
  fileName,
  buffer,
  directory = "./public/imgs/"
) => {
  try {
    await writeFile(path.join(directory, fileName), buffer);
    return true;
  } catch (error) {
    console.log("Could not save file: ", error);
    return false;
  }
};

module.exports = {
  resetDir,
  saveImgToPublic,
};
