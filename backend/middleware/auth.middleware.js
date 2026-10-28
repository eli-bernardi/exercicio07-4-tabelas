const CryptoJS = require("crypto-js");
const secretKey = "eliel";

function authMiddleware(req, res, next) {
  const token = req.header["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    const bytes = CryptoJS.AES.decrypt(token, secretKey);
    const dadosDescripto = bytes.toString(CryptoJS.enc.Utf8);

    if (!dadosDescripto) {
      return res.status(401).json({ message: "TOken inválido!" });
    }

    const payload = JSON.parse(dadosDescripto);

    if (Date.now() > payload.expiraEM) {
      return res.status(401).json({ message: "Tempo expirado!" });
    }

    req.usuario = payload;

    next();
  } catch (err) {
    console.error("Erro na operação!");
    return res.status(500).json({ message: "Erro na operação!" });
  }
}

module.exports = authMiddleware