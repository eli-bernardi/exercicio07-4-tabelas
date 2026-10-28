const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Entrega = db.define(
  "entrega",
  {
    codEntrega: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cidadeDestino: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    statusAtual: {
      type: DataTypes.ENUM("ENTREGUE", "TRANSITO"),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    idCarga: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cargas",
        key: "codCarga",
      },
    },
  },
  {
    tableName: "entregas",
    timestamps: false,
  }
);

module.exports = Entrega;
