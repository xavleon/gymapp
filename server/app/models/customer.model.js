module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    membership: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    confirmed: {
      type: Sequelize.BOOLEAN
    }
  });

  return Customer;
};
