const Funcionario = require("../models/Funcionario");
const CryptoJS = require("crypto-js");
const secretKey = "eliel";

const login = async (req, res) => {
  const valores = req.body;

  if (!valores.email || !valores.senha) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatorios" });
  }
  try {
    const funcionario = await Funcionario.findOne({
      where: { email: valores.email },
    });
    if (!funcionario) {
      return res.status(404).json({ message: "Funcionario não encontrado" });
    }
    const bytes = CryptoJS.AES.decrypt(funcionario.senha, secretKey);
    const senhaDescrypto = bytes.toString(CryptoJS.enc.Utf8);

    if (!valores.senha !== senhaDescrypto) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const TresHorasEmMS = 3 * 60 * 60 * 1000;
    const tempoExpirar = Date.now() + TresHorasEmMS;

    const payload = {
      idFuncionario: funcionario.codFuncionario,
      nome: funcionario.nome,
      expirarEm: tempoExpirar,
    };

    const token = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      secretKey
    ).toString();
    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token: token,
      nome: cliente.nome,
    });
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
};

module.exports = { login };
