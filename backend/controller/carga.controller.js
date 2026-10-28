const Carga = require("../models/Carga");
const Motorista = require("../models/Motorista");

const cadastrar = async (req, res) => {
  const valores = req.body;
  console.log(valores);

  if (
    !valores.descricao ||
    !valores.peso ||
    !valores.volume ||
    !valores.codigoRastreio ||
    !valores.idMotorista
  ) {
    return res
      .status(401)
      .json({ message: "Todos os valores devem ser inseridos!" });
  }

  const idMotorista = await Motorista.findByPk(id);
  if (!idMotorista) {
    return res.status(201).json({ message: "Motorista não encontrado!" });
  }
  try {
    const carga = await Carga.create({
      descricao: valores.descricao,
      peso: valores.peso,
      volume: valores.volume,
      codigoRastreio: valores.codigoRastreio,
      idMotorista: idMotorista,
    });
    return res.status(201).json({ message: "Operação realizada com sucesso!" });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};

module.exports = { cadastrar };
