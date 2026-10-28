const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Carga = db.define(
  "carga",
  {
    codCarga: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    volume: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    codigoRastreio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idMotorista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "motoristas",
        key: "codMotorista",
      },
    },
  },
  {
    tableName: "cargas",
    timestamps: false,
  }
);

module.exports = Carga;
