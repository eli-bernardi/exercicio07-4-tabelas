const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./db/db");
const HOST = "localhost";
const PORT = 3000;

const authMiddleware = require("./middleware/auth.middleware");
const authController = require("./controller/auth.controller");
const funcionarioController = require("./controller/funcionario.controller");
const cargaController = require("./controller/carga.controller");
const motoristaController = require("./controller/motorista.controller");
const entregaController = require("./controller/entrega.controller");

require("./models/rel");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

// Rotas públicas
app.post("/funcionario/cadastrar", funcionarioController.cadastrar);
app.post("/login", authController.login);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Aplicação de clientes Rodando!" });
});

app.use(authMiddleware)

//Rota Privada
//Motorista
app.post("/motorista/cadastrar", motoristaController.cadastrar);
app.get("/motorista/consultar/:id", motoristaController.consultar);
app.put("/motorista/atualizar/:id", motoristaController.atualizar);
app.delete("/motorista/apagar/:id", motoristaController.apagar);

//Carga
app.post("/carga/cadastrar", cargaController.cadastrar);

//Entrega
app.post("/entrega/cadastrar", entregaController.cadastrar);
app.get("/entrega/consultar", entregaController.consultar);
app.put("/entrega/atualizar", entregaController.atualizar);

db.sync()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados!", err);
  });
