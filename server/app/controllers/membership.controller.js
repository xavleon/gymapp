const db = require("../models");
const Membership = db.memberships;
const Op = db.Sequelize.Op;

// Create and Save a new Membership
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Membership
  const membership = {
    title: req.body.title,
    description: req.body.description,
    confirmed: req.body.confirmed ? req.body.confirmed : false
  };

  // Save Membership in the database
  Membership.create(membership)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Membership."
      });
    });
};

// Retrieve all Memberships from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Membership.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving memberships."
      });
    });
};

// Find a single Membership with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Membership.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Membership with id=" + id
      });
    });
};

// Update a Membership by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Membership.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Membership was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Membership with id=${id}. Maybe Membership was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Membership with id=" + id
      });
    });
};

// Delete a Membership with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Membership.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Membership was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Membership with id=${id}. Maybe Membership was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Membership with id=" + id
      });
    });
};

// Delete all Memberships from the database.
exports.deleteAll = (req, res) => {
  Membership.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Memberships were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all memberships."
      });
    });
};

// find all confirmed Membership
exports.findAllConfirmed = (req, res) => {
  Membership.findAll({ where: { confirmed: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving memberships."
      });
    });
};
