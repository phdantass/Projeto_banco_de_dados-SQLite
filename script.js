const form = document.getElementById("form");
const lista = document.getElementById("lista-feedbacks");

// Senha do Admin para excluir os FeedBacks
// como esse script sera aberto, troque o "1234" para a sua senha 
const senhaAdmin = "1234";

// Atualizar as listas de FeedBacks
function atualizarLista() {
    lista.innerHTML = "<h3>Feedbacks Salvos:</h3>";
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    if(feedbacks.length === 0){
        lista.innerHTML += "<p>Nenhum feedback salvo ainda.</p>";
    } else {
        feedbacks.forEach((f, i) => {
            lista.innerHTML += `
            <p>
                <strong>${f.nome}</strong> (${f.email})<br>
                ${f.mensagem}<br>
                 <span class="hora">${f.criado_em}</span><br>
                <button onclick="tentarExcluir(${i})">Excluir</button>
            </p><hr>`;
        });
    }
}

// Pedi a senha antes de excluir os Feedbacks
function tentarExcluir(index) {
    const senha = prompt("Digite a senha de admin para excluir:");
    if(senha === senhaAdmin) {
        excluirFeedback(index);
        alert("Feedback excluído!");
    } else {
        alert("Senha incorreta! Você não pode excluir o feedback.");
    }
}

// Exclui o feedback
function excluirFeedback(index) {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    feedbacks.splice(index, 1);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    atualizarLista();
}

// Evento do formulário
form.addEventListener("submit", function(e){
    e.preventDefault();

    const feedback = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        mensagem: document.getElementById("mensagem").value,
        criado_em: new Date().toLocaleString()
    };

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    alert("Feedback salvo localmente!");
    form.reset();
    atualizarLista();
});

// Atualiza lista ao carregar a página
atualizarLista();
