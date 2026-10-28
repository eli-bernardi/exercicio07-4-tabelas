const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Funcionario = db.define(
  "funcionario",
  {
    codFuncionario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "funcionarios",
    timestamps: false,
  }
);

module.exports = Funcionario;
