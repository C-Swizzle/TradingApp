module.exports = function(sequelize, DataTypes) {
    var sellOffers=sequelize.define("sellOffers",
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
                len:[1,255]
            }
        },
        price: {
            type:DataTypes.DECIMAL,
            allowNull:false,
            validate:{
                notEmpty:true,
                min: 0
            }
        },
        imageUrl:{
            type:DataTypes.STRING
        },
        consoleType:{
            type:DataTypes.STRING
        },
        description:DataTypes.TEXT,
        condition:DataTypes.STRING,
        inTransaction: {
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        soldBoolean:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        soldAtTime:{
            type:DataTypes.DATE,
            defaultValue:null
        },
        buyerId: {
            type:DataTypes.INTEGER,
            defaultValue:null
        },
        hasBeenShippedBool: {
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        },
        shippedAtTime: {
            type:DataTypes.TIME,
            defaultValue:null
        },
        tradeCompleteBool: {
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        }
    });
    sellOffers.associate = function(models) {
        // saying that sellOffers should belong to Users
        // A sellOffers can't be created without Users due to the foreign key constraint
        sellOffers.belongsTo(models.Users, {
          foreignKey: {
            allowNull: false
          }
        });
      };
     
    return sellOffers;
}
