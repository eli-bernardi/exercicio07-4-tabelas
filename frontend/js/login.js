const res = document.getElementById("res");
const btn_login = document.getElementById("btn_login");

btn_login.addEventListener("click", (e) => {
  e.preventDefault();

  const valores = {
    email: email,
    senha: senha,
  };

  fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      Authorization: token,
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
      console.error("Erro no login:", err);
      resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`;
    });
});
