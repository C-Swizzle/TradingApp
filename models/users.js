module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstName:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:true,
        len:[2,50]
      }
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:true,
        len:[2,50],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: {
          args: true,
          msg: 'Email address already in use!'
      }
     },



    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:true,
        len:[2,20],
      },
      unique: {
        args: true,
        msg: 'Username already in use!'
    }
    }, 
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:true,
        len:[2,20],
      }
    }, 
    
    address: {
      type: DataTypes.STRING,
    },
    credits:  {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
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
