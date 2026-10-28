const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Motorista = db.define(
  "motorista",
  {
    codMotorista: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cnh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "motoristas",
    timestamps: false,
  }
);

module.exports = Motorista;
