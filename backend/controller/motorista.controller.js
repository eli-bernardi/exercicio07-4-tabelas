const Motorista = require("../models/Motorista");

const CryptoJS = require("crypto-js");
const secretKey = "eliel";

const cadastrar = async (req, res) => {
  const valores = req.body;
  console.log(valores);

  if (!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone) {
    return res
      .status(401)
      .json({ message: "Todos os valores devem ser inseridos!" });
  }
  try {
    const senhaCrypto = CryptoJS.AES.encrypt(
      valores.senha,
      secretKey
    ).toString();
    const cpfCrypto = CryptoJS.AES.encrypt(valores.cpf, secretKey).toString();

    const motorista = await Motorista.create({
      nome: valores.nome,
      email: valores.email,
      cnh: valores.cnh,
      senha: senhaCrypto,
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
    const motorista = await Motorista.findByPk();

    if (!motorista) {
      return res.status(404).json({ message: "Motorista não encontrado!" });
    }

    const bytes = CryptoJS.AES.decrypt(motorista.cpf, secretKey);
    const cpfDescripto = bytes.toString(CryptoJS.enc.Utf8);
    const cnhDescripto = -bytes.toString(CryptoJS.enc.Utf8);

    return res.status(200).json({
      nome: motorista.nome,
      cnh: motorista.cnh,
      cpf: cpfDescripto,
      telefone: motorista.telefone,
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
    const motorista = await Motorista.findByPk();

    if (!motorista) {
      return res.status(404).json({ message: "Motorista não encontrado!" });
    }

    const dadosAtualizados = { ...valores };

    if (valores.cpf) {
      if (valores.cpf.length !== 11) {
        return res.status(404).json({ message: "CPF inválido!" });
      }
      dadosAtualizados.cpf = CryptoJS.AES.encrypt(
        valores.cpf,
        secretKey
      ).toString();
    }

    if (valores.senha) {
      dadosAtualizados.senha = CryptoJS.AES.encrypt(
        valores.senha,
        secretKey
      ).toString();
    }
    await Motorista.update(dadosAtualizados, { where: { codMotorista: id } });
    return res.status(200).json({ message: "Motorista atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};

const apagar = async (req, res) => {
  const id = req.params.id;

  try {
    const motorista = await Motorista.findByPk();
    if (!motorista) {
      return res.status(404).json({ message: "Motorista não encontrado!" });
    }
    await Motorista.destroy({ where: { codMotorista: id } });
    return res.status(200).json({ message: "Motorista exluido com sucesso!" });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};

module.exports = { cadastrar, consultar, atualizar, apagar };
