module.exports = (sequelize, Sequelize) => {
  const Membership = sequelize.define("membership", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    confirmed: {
      type: Sequelize.BOOLEAN
    }
  });

  return Membership;
};
