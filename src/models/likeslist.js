'use strict';
// 資料表欄位 name facebookId created_time category
module.exports = (sequelize, DataTypes) => {
  const Likeslist = sequelize.define('Likeslist', {
    name: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    created_time: DataTypes.STRING,
    category: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
      },
    },
  });

  return Likeslist;
};
