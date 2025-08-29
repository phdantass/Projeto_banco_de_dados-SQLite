# 📝 Feedback Offline – Como eu construí este projeto

![Banner do projeto](imagens/banner.gif)

Este projeto é um **formulário de feedback offline**, totalmente sem servidor, feito para armazenar mensagens diretamente no navegador ou em **SQLite local**, utilizando **HTML, CSS e JavaScript**. Abaixo vou explicar **como eu fiz cada parte do projeto**.

---

## 🔹 1️⃣ Planejamento

Antes de escrever qualquer código, eu planejei:

1. Quais campos o formulário teria: **Nome, Email, Mensagem**  
2. Que os **feedbacks seriam exibidos na mesma página**  
3. Que haveria um **aviso para o usuário** ("Entraremos em contato o mais breve possível!!")  
4. Que apenas o **administrador poderia excluir comentários**  
5. Que o **layout seria centralizado, responsivo e visualmente agradável**  
6. Que adicionaria **favicon, imagens de fundo e GIFs** para estética  

---

## 🔹 2️⃣ Estrutura HTML

Usei HTML para criar a estrutura do site:

- Um **container centralizado** com `div.container`  
- Um `<form>` com três campos (`input` para nome e email, `textarea` para mensagem)  
- Um `<button>` de envio  
- Uma `<div id="lista-feedbacks">` para mostrar os feedbacks  
- Um `<p class="texto-transparente">` para o aviso  

Exemplo:

```html
<div class="container">
    <h1>Formulário de Feedback</h1>
    <form id="form">
        <label>Nome:</label>
        <input type="text" id="nome" required>

        <label>Email:</label>
        <input type="email" id="email" required>

        <label>Mensagem:</label>
        <textarea id="mensagem" rows="5" required></textarea>

        <button type="submit">Enviar</button>
    </form>

    <div id="lista-feedbacks"></div>

    <p class="texto-transparente">Entraremos em contato o mais breve possível!!</p>
</div>
```
✅ Cada elemento foi pensado para:

Ser centralizado e esteticamente agradável

Ter boa legibilidade e usabilidade


## 🔹 3️⃣ Estilização com CSS

Para deixar o site bonito e centralizado, usei flexbox e cores semitransparentes:

Container centralizado: display: flex; flex-direction: column; align-items: center;

Campos centralizados: largura menor que o container (width: 70%) e margin: 0 auto

Botão centralizado: largura menor que o container, margin: 10px auto

Feedbacks: fundo sólido com rgba(255,255,255,0.15) e texto centralizado

Horário do comentário: cor com opacity 0.75

Aviso do usuário: opacidade 50% e centralizado

Imagem de fundo e favicon para estética

Exemplo de CSS para os campos centralizados:

````css
input, textarea {
    width: 70%;
    max-width: 500px;
    padding: 12px;
    margin: 10px auto;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    display: block;
}

button {
    width: 50%;
    max-width: 300px;
    padding: 12px;
    margin: 10px auto;
    background: #ff9800;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
}
````
## 🔹 4️⃣ Funcionalidade com JavaScript
No JS, implementei:

Captura de dados do formulário com addEventListener('submit', ...)

Armazenamento em memória (pode ser adaptado para SQLite via Python)

Exibição dinâmica dos feedbacks na div #lista-feedbacks

Inclusão do horário do envio, com opacidade 75%

Botão de excluir que remove o comentário da lista (restrito a administrador)

Exemplo de função para exibir os feedbacks:

javascript
````
function atualizarLista() {
    lista.innerHTML = '';
    feedbacks.forEach((f, i) => {
        lista.innerHTML += `
        <p>
            <strong>${f.nome}</strong> (${f.email})<br>
            ${f.mensagem}<br>
            <span class="hora">${f.criado_em}</span><br>
            <button onclick="excluir(${i})">Excluir</button>
        </p>`;
    });
}
````
## 🔹 5️⃣ Ícone na aba (Favicon)
Para deixar o site mais profissional, adicionei um favicon:

html
Copiar código
<link rel="icon" type="image/png" href="imagens/favicon.png">
O ícone aparece na aba do navegador

Pode ser .png, .ico ou .svg

Melhorou a identidade visual do site

## 🔹 6️⃣ Layout responsivo e visual
Imagem de fundo (fundo.jpg) para estética

Banner GIF (banner.gif) para ilustrar o projeto

Feedbacks centralizados e com fundo semitransparente

Aviso do usuário centralizado com 50% de opacidade

## 🔹 7️⃣ Testando o projeto
Abra index.html no navegador

Preencha o formulário

Veja os feedbacks aparecerem abaixo

Botão de excluir funciona apenas para administrador

Campos e botão estão centralizados e o layout responde bem a diferentes telas

## 🔹 8️⃣ Estrutura final do projeto
````
feedback-offline/
│
├── index.html
├── style.css
├── script.js
├── imagens/
│   ├── fundo.jpg
│   ├── favicon.png
└── README.md
````
## 🔹 9️⃣ Observações finais
Projeto offline, não precisa de servidor web

Pode ser adaptado para usar SQLite local com Python

Todo o layout foi pensado para ser centralizado, limpo e moderno

Favicon, imagens e GIFs tornam o projeto mais profissional

🧑‍💻 Autor
Pedro Dantas (phdantass)
