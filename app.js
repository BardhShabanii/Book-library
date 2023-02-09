const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const methodOverride = require("method-override");


const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



//Use forms for Put and Delete
app.use(methodOverride("_method"));

app.use("/", bookRoutes)
app.listen(PORT, () => {
  console.log("App is listening on port: " + PORT);
});
