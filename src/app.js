//jshint esversion: 9

const path = require("path");
const express = require("express");
const mustacheExpress = require("mustache-express");
const geocoding = require("./utils/geocoding");
const weatherForecast = require("./utils/weather");
const app = express();

// Setting variables for the different views
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname + "../../templates/partials");

// Setting up the templating engine => Register '.mustache' extension with The Mustache Express
// Setting up the partials engine passed to mustacheExpress(....)
app.engine("html", mustacheExpress(partialsDir, '.html'));
// Setting the view engine to html
app.set("view engine", "html");
//Setting up the views 
app.set("views", viewsDir);
// Setting up the public files
app.use(express.static(publicDir));
// response.body that comes in as a json object
app.use(express.json());


app.get("", (req, res) => {
 res.render("index", {
  title: "Home",
  year: new Date().getFullYear()
 });
});

app.get("/about", (req, res) => {
 res.render("about", {
  title: "About",
  year: new Date().getFullYear()
 });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    year: new Date().getFullYear()
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.location;
  geocoding(location, (data, error) => {
    if (error) {
      return res.send({ error });
    }

    weatherForecast(data, (weatherData, error) => {
      if (error) {
        return res.send({ error });
      }

      res.send(weatherData);
    });
  });
});

app.get("/profile", (req, res) => {
  res.send('Check Back Later');
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    year: new Date().getFullYear()
  });
});
const port = process.env.PORT;
app.listen(port, () => {
 console.log(`Server is listening on port ${port}`);
});