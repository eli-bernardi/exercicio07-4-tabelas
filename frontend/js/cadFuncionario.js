let token = localStorage.getItem("token");
if (!token) {
  location.href = "../index.html";
}

const res = document.getElementById("res");
const btn_cadastrar = document.getElementById("btn_cadastrar ");

btn_cadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  valores = {
    nome: nome,
    email: email,
    senha: senha,
  };

  fetch(`http://localhost:3000/cadastrar/funcionario`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      'Authorization': token,
    },
    body: JSON.stringify(valores),
  })
    .then((res) => res.json())
    .then((dados) => {
      resposta.innerHTML = `<p>${dados.message}</p>`;
      if (dados.token) {
        localStorage.setItem("token", dados.token);
        localStorage.setItem("nomeCliente", dados.nome);
        location.href = "../index.html";
      }
    })
    .catch((err) => {
      console.error("Erro ao cadastrar:", err);
      resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`;
    });
});
