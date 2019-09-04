var db = require("../models");

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    db.Car.findAll(
      {
        include: [db.Customer]
      }).then(function (dbCars) {
        res.render("index", {
          cars: dbCars
        });
      });
  });

  app.get("/api/cars", function (req, res) {
    db.Car.findAll(
      {
        include: [db.Customer],
        where: {
          sold: true
        }
      }).then(function (dbCars) {
        res.render("index2", {
          cars: dbCars
        });
      });
  });

  /*  Catalog.find({where:
      {id: itemId},
      include: {
          model: models.ProductCategory, 
          where: {
            language_id: {$col: 'Catalog.language_id'}
          }
      }
  })
    /*  where: {
        transaction_id: {
          // "$eq" changes to "[Op.eq]"
          [Op.eq]: null
        }
        Model.findAll({
     where: {
        id: {
          [Op.or]: [1234, null]
        }
     }
  });
    }*/

  // Create a new car
  app.post("/api/cars", function (req, res) {
    db.Car.create(req.body).then(function (dbCars) {
      res.json(dbCars);
    });
  });

  // Update a car
  app.put("/api/cars", function (req, res) {
    db.Car.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbCars) {
      res.json(dbCars);
    });
  });

  // Delete a car by id
  app.delete("/api/cars/:id", function (req, res) {
    db.Car.destroy({ where: { id: req.params.id } }).then(function (dbCars) {
      res.json(dbCars);
    });
  });
};
