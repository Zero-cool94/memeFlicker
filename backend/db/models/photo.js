'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    user_id: DataTypes.INTEGER,
    photo_url: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
    Photo.belongsTo(models.User, {foreignKey: 'photo_id'});
  };
  return Photo;
};
