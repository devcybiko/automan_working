var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Car.findAll({
      include: [db.Customer]
    }).then(function (dbCars) {
      res.render("index", {
        msg: "Welcome!",
        cars: dbCars
      });
    });
  });

  // Load car page with inventory radio selected 
  app.get("/cars/:id", function (req, res) {
    var query = {};
    if (req.params.id === "I") {
      query.CustomerId = null
    }
    else if (req.params.id === 'S') {
      query.CustomerId != null
    }
    console.log("query " + query)
    alert("query")
    db.Car.findAll({
      where: query,
      include: [db.Customer]
    }).then(function (dbCars) {
      res.render("index", {
        cars: dbCars
      });
    });
  });

  /*Post.findAll({
    where: {
      authorId: 12,
      status: 'active'
    }*/

  // Load car page with inventory radio selected 
  /* app.get("/cars/S", function (req, res) {
     db.Car.findAll({include: [dbCustomer],
       where: { CustomerId: null }
     }).then(function (dbCars) {
       res.render("index", {
         cars: dbCars
       });
     });
   });*/

  /*app.get("/cars/:id", function(req, res) {
    db.Car.findOne({ where: { id: req.params.id } }).then(function(dbCars) {
      res.render("index", {
        cars: dbCars
      });
    });
  });*/

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
