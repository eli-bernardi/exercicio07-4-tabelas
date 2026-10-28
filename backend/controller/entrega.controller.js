const Entrega = require("../models/Entrega");
const Carga = require("../models/Carga");

const CryptoJS = require("crypto-js");
const secretKey = "eliel";

const cadastrar = async (req, res) => {
  const valores = req.body;
  console.log(valores);

  if (
    !valores.cidadeDestino ||
    !valores.statusAtual ||
    !valores.data ||
    !valores.hora ||
    !valores.idCarga
  ) {
    return res
      .status(401)
      .json({ message: "Todos os valores devem ser inseridos!" });
  }

  try {
    const idCarga = await Carga.findOne({ where: { idCarga: idCarga } });

    const novaEntrega = await Entrega.create({
      cidadeDestino: valores.cidadeDestino,
      statusAtual: valores.statusAtual,
      data: valores.data,
      hora: valores.hora,
      idCarga: valores.idCarga,
    });
    return res.status(201).json({ message: "Operação realizada com sucesso!" });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};
const consultar = async (req, res) => {
  const id = req.params.id;

  try {
    const entrega = await Entrega.findByPk();

    if (!entrega) {
      return res.status(404).json({ message: "Entrega não encontrado!" });
    }

    return res.status(200).json({
      cidadeDestino: valores.cidadeDestino,
      statusAtual: valores.statusAtual,
      data: valores.data,
      hora: valores.hora,
      idCarga: valores.idCarga,
    });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};

const atualizar = async (req, res) => {
  const id = req.params.id;
  const valores = req.body;
  try {
    const entrega = await Entrega.findByPk();

    if (!entrega) {
      return res.status(404).json({ message: "Entrega não encontrado!" });
    }

    const dadosAtualizados = { ...valores };

    await Entrega.update(dadosAtualizados, { where: { codEntrega: id } });
    return res.status(200).json({ message: "Entrega atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};

module.exports = { cadastrar, consultar, atualizar };
