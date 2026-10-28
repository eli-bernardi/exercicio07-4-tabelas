const Funcionario = require("../models/Funcionario");

const CryptoJS = require("crypto-js");
const secretKey = "eliel";

const cadastrar = async (req, res) => {
  const valores = req.body;
  console.log(valores);

  if (!valores.nome || !valores.email || !valores.senha) {
    return res
      .status(401)
      .json({ message: "Todos os valores devem ser inseridos!" });
  }
  try {
    const senhaCrypto = CryptoJS.AES.encrypt(
      valores.senha,
      secretKey
    ).toString();

    const funcionario = await Funcionario.create({
      nome: valores.nome,
      email: valores.email,
      senha: senhaCrypto,
    });
    return res.status(201).json({ message: "Operação realizada com sucesso!" });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};

module.exports = { cadastrar };
