require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

app.set("view engine", "ejs");

app.get("/myget", (req, res) => {
  console.log(req.body);
  res.send(req.query);
});

app.post("/mypost", (req, res) => {
  console.log(req.files);
  res.send(req.body);
});

app.get("/getForm", (req, res) => {
  res.render("getForm");
});

app.get("/postForm", (req, res) => {
  res.render("postForm");
});

module.exports = app;
