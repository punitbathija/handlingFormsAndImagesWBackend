require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.set("view engine", "ejs");

app.get("/myget", (req, res) => {
  res.send("<h1>Welcome to My App</h1>");
});

app.get("/getForm", (req, res) => {
  res.render("getForm");
});

app.get("/postForm", (req, res) => {
  res.render("postForm");
});

module.exports = app;
