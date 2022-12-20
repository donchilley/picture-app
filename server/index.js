const express = require("express");
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 3009;
const app = express();

const images = []

function saveImage(image) {
  images.push({ imageData: image });
}

//app.use(express.json({ limit: '500mb' }));
//app.use(express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

const cors = require("cors")
app.use(cors({
  origin: "http://localhost:3000"
}))

router.get("/images", (req, res) => {
  console.log("received request.")
  res.json({ message: 'Draft has not started yet.' })
})


const imageDirectoryPath = path.join(__dirname, './images');
router.post("/image",
  bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "15mb" }),
  (req, res) => {
    try {
      fs.writeFile(imageDirectoryPath + '/hello.jpeg', req.body, (error) => {
        if (error) {
          throw error;
        }
      });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });

/*
router.post("/image", (req, res) => {
  console.log(req.body)
  fs.writeFile("./images/image.png", req.body, (error => {
    if (error) {
      throw error;
    }
  }))
})
*/

app.use("/", router)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
