var express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use("/public", express.static(__dirname + "/public"));
var path = require("path");

// viewed at http://localhost:3000
app.get(["/", "/index"], function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});
// viewed at http://localhost:3000/cart
app.get("/cart", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/cart.html"));
});

var routes = require("./api/routes/appRoutes");
routes(app);

app.listen(port, () => {
  console.log(`Yene Pay connected at port ${port}`);
});
