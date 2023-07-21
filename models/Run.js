const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Run extends Model {}

Run.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // name of run
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    distance_ran: {
      type: DataTypes.INTEGER,
      alowNull: false
    },
    time_ran: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'run',
  }
)

module.exports = Run
