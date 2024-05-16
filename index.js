const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { getHash } = require("./scripts/compression");
const { resetDir, saveImgToPublic } = require("./scripts/file-manager");
const { saveHash, getImg } = require("./scripts/db-manager");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = express();

resetDir("temp")
  // reseting public/imgs
  .then(resetDir)
  .then(() => {
    app.use(bodyParser.json());

    app.use(express.static("public"));
    app.post("/api/upload", upload.single("file"), async (req, res) => {
      try {
        const success = await saveImgToPublic(
          req.file.originalname,
          req.file.buffer
        );

        if (success) {
          const hash = await getHash(req.file.buffer);
          saveHash({
            hash,
            url: "/imgs/" + req.file.originalname,
          });
          res.status(204).send();
        } else {
          res.status(500).send();
        }
      } catch (error) {
        console.log(error);
      }
    });
    app.get("/banner-metadata", async (req, res) => {
      try {
        const imgMetadata = getImg();
        res.send(imgMetadata);
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(
      "Something went wrong went trying reset the imgs folder: ",
      error
    );
  });
