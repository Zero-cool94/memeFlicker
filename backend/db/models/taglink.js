'use strict';
module.exports = (sequelize, DataTypes) => {
  const Taglink = sequelize.define('Taglink', {
    photo_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {});
  Taglink.associate = function(models) {
    // associations can be defined here
  };
  return Taglink;
};