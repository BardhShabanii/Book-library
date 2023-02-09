const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const methodOverride = require("method-override");
const dbURI = "mongodb+srv://bardhi:bardhi123@cluster0.4rotd4t.mongodb.net/?retryWrites=true&w=majority"
const PORT = 8000;

mongoose.connect(dbURI);


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



//Use forms for Put and Delete
app.use(methodOverride("_method"));

app.use("/", bookRoutes)
app.listen(PORT, () => {
  console.log("App is listening on port: " + PORT);
});
