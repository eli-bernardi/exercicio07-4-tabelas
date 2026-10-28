const db = require("./db/db");
const { Funcionario, Motorista, Carga, Entrega } = require("./models/rel");

async function syncDataBase() {
  try {
    await db.sync({ force: true });
    console.log("Abrindo conexão com o banco de dados!");
  } catch (err) {
    console.error("Erro ao abrir conexão!");
  } finally {
    await db.close();
    console.log("FEchando conexão com o banco!");
  }
}
syncDataBase();
