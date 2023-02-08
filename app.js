require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

//Middlewaare's
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.set("view engine", "ejs");

app.get("/myget", (req, res) => {
  console.log(req.body);
  res.send(req.query);
});

app.post("/mypost", async (req, res) => {
  let result;
  let imageArray = [];

  // ## Multiple Image

  if (req.files) {
    for (let i = 0; i < req.files.file.length; i++) {
      let result = await cloudinary.uploader.upload(
        req.files.file[i].tempFilePath,
        {
          folder: "user",
        }
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  //   ### Single Image

  //   let file = req.files.file;

  //   result = await cloudinary.uploader.upload(file.tempFilePath, {
  //     folder: "users",
  //   });

  console.log(result);

  details = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    result,
    imageArray,
  };

  res.send(details);
  console.log(details);
});

app.get("/getForm", (req, res) => {
  res.render("getForm");
});

app.get("/postForm", (req, res) => {
  res.render("postForm");
});

module.exports = app;
