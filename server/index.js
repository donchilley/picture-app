const express = require("express");
const router = express.Router();
const fs = require('fs');
const multer = require('multer')
const path = require('path')

const PORT = process.env.PORT || 3009;
const app = express();
const cors = require("cors")
app.use(cors({
  origin: "http://localhost:3000"
}))

router.get("/images", (req, res) => {
  res.json(JSON.stringify(imageDir));
})

const imageDirectoryPath = path.join(__dirname, './images');
app.use('/images', express.static(imageDirectoryPath))
const imageDir = [
  { name: 'oasis', path: `images/oasis.jpeg` },
  { name: 'tree', path: `images/tree.jpeg` },
  { name: 'waterfall', path: 'images/waterfall.jpeg' },
  { name: 'fall', path: 'images/fall.jpeg' }
]

const upload = multer();
router.post("/image_form", upload.any(), (req, res) => {
  const name = req.body.name;
  const path = imageDirectoryPath + "/" + req.body.name + ".jpeg";
  const index = imageDir.findIndex((image) => image.name === name)
  if (index !== -1) {
    imageDir.splice(index, 1)
  }
  imageDir.push({ name, path: `images/${req.body.name}.jpeg` })
  try {
    fs.writeFile(path, req.files[0].buffer, (error) => {
      if (error) {
        throw error;
      }
    });
    res.json(JSON.stringify(imageDir));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.use("/", router)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
