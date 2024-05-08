module.exports = app => {
  const memberships = require("../controllers/membership.controller.js");

  var router = require("express").Router();

  // Create a new Membership
  router.post("/", memberships.create);

  // Retrieve all Memberships
  router.get("/", memberships.findAll);

  // Retrieve all confirmed Memberships
  router.get("/confirmed", memberships.findAllConfirmed);

  // Retrieve a single Membership with id
  router.get("/:id", memberships.findOne);

  // Update a Membership with id
  router.put("/:id", memberships.update);

  // Delete a Membership with id
  router.delete("/:id", memberships.delete);

  // Delete all Memberships
  router.delete("/", memberships.deleteAll);

  app.use('/api/memberships', router);
};
