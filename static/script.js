const form = document.getElementById("form");
const lista = document.getElementById("lista-feedbacks");

// Senha do Admin
const senhaAdmin = "1234";

// Atualiza lista puxando do servidor
async function atualizarLista() {
    const res = await fetch('http://127.0.0.1:5000/feedbacks');
    const feedbacks = await res.json();
    lista.innerHTML = "<h3>Feedbacks Salvos:</h3>";
    if(feedbacks.length === 0){
        lista.innerHTML += "<p>Nenhum feedback salvo ainda.</p>";
    } else {
        feedbacks.forEach(f => {
            lista.innerHTML += `
            <p>
                <strong>${f.nome}</strong> (${f.email})<br>
                ${f.mensagem}<br>
                <span class="hora">${f.criado_em}</span><br>
                <button onclick="tentarExcluir(${f.id})">Excluir</button>
            </p><hr>`;
        });
    }
}

// Tenta excluir (verifica senha)
async function tentarExcluir(id) {
    const senha = prompt("Digite a senha de admin para excluir:");
    if(senha === senhaAdmin) {
        await fetch(`http://127.0.0.1:5000/excluir/${id}`, { method: 'DELETE' });
        alert("Feedback excluído!");
        atualizarLista();
    } else {
        alert("Senha incorreta! Você não pode excluir o feedback.");
    }
}

// Envia novo feedback para SQLite
form.addEventListener("submit", async function(e){
    e.preventDefault();

    const feedback = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        mensagem: document.getElementById("mensagem").value,
        criado_em: new Date().toLocaleString()
    };

    await fetch('http://127.0.0.1:5000/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
    });

    alert("Feedback salvo no SQLite!");
    form.reset();
    atualizarLista();
});

// Carrega feedbacks ao abrir a página
atualizarLista();
