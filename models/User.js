const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model{
      verifyPassword(password){
            return bcrypt.compareSync(password, this.password);
      }
}

User.init({
      id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
      },
      // first_name: {
      //       type: DataTypes.STRING,
      //       allowNull: false,
      // },
      // last_name: {
      //       type: DataTypes.STRING,
      //       allowNull: false,
      // },
      username: {
            type: DataTypes.STRING,
            allowNull: false
      },
      email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                  isEmail: true
            }
      },
      password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                  len: [4]
            }
      }}, {
      hooks: {
            async beforeCreate(newUser){
                  newUser.password = await bcrypt.hash(newUser.password, 10);
                  return newUser;
            },
            async beforeUpdate(user){
                  user.password = await bcrypt.hash(user.password, 10);
                  return user;
            },
      },
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: "user",
      timestamps: false
});


module.exports = User;