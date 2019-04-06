var bcrypt = require("bcrypt-nodejs");

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

  // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
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
