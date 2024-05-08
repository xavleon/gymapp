const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Customer
  const customer = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    membership: req.body.membership,
    email: req.body.email,
    confirmed: req.body.confirmed ? req.body.confirmed : false
  };

  // Save Customer in the database
  Customer.create(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const firstname = req.query.firstname;
  var condition = firstname ? { firstname: { [Op.like]: `%${firstname}%` } } : null;

  Customer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + id
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Customers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    });
};

// find all confirmed Customer
exports.findAllConfirmed = (req, res) => {
  Customer.findAll({ where: { confirmed: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};
