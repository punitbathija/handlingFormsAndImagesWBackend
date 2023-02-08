require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.set("view engine", "ejs");

app.get("/myget", (req, res) => {
  console.log(req.body);
  res.send(req.query);
});

app.get("/getForm", (req, res) => {
  res.render("getForm");
});

app.get("/postForm", (req, res) => {
  res.render("postForm");
});

module.exports = app;
