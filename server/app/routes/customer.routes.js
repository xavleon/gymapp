module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customers.create);

  // Retrieve all Customers
  router.get("/", customers.findAll);

  // Retrieve all confirmed Customers
  router.get("/confirmed", customers.findAllConfirmed);

  // Retrieve a single Customer with id
  router.get("/:id", customers.findOne);

  // Update a Customer with id
  router.put("/:id", customers.update);

  // Delete a Customer with id
  router.delete("/:id", customers.delete);

  // Delete all Customers
  router.delete("/", customers.deleteAll);

  app.use('/api/customers', router);
};
