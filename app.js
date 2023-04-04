const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const MongoStore = require("connect-mongo")(session);
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const methodOverride = require("method-override");
const dbURI =
  "mongodb+srv://bardhi:bardhi123@cluster0.4rotd4t.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8000;

const db = mongoose.connection.useDb('BookDatabase')
require("./config/passport")(passport);

mongoose.connect(dbURI);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Use forms for Put and Delete
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", bookRoutes);
app.listen(PORT, () => {
  console.log("App is listening on port: " + PORT);
});
