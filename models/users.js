module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type:DataTypes.STRING,
      validation: {
        notNull:true,
        notEmpty:true,
        len:[2,20],
      }
    }, 
    password: {
      type:DataTypes.STRING,
      validation: {
        notNull:true,
        notEmpty:true,
        len:[2,20],
      }
    }, 
    
    address: {
      type: DataTypes.STRING,
    },
    credits:  {
      type:DataTypes.DECIMAL,
      validation:{
        notNull:true,
        notEmpty:true
      }
    },

  });

  Users.associate = function(models) {
    // Associating Users with Posts
    // When an Users is deleted, also delete any associated Posts
    Users.hasMany(models.sellOffers, {
      onDelete: "cascade"
    });
  };
  return Users;
};
