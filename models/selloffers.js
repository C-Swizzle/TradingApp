module.exports = function(sequelize, DataTypes) {
    var sellOffers=sequelize.define("sellOffers",
    {
        name:{
            type:DataTypes.STRING,
            validation:{
                notNull:true,
                notEmpty:true,
                len:[1,255],

            },
        price: {
            type:DataTypes.DECIMAL,
            validation:{
                notNull:true,
                notEmpty:true,
                min: 0
            }
        },
        description:DataTypes.TEXT,
        condition:DataTypes.STRING,
        inTransaction: DataTypes.BOOLEAN
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
