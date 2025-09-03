// Importa o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getFirestore, 
  addDoc, 
  collection, 
  onSnapshot, 
  serverTimestamp, 
  deleteDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3cRc2-x8Di72pnkaB4lHc43k2B_N7Jg4",
  authDomain: "projeto-banco-de-dados-dantas.firebaseapp.com",
  projectId: "projeto-banco-de-dados-dantas",
  storageBucket: "projeto-banco-de-dados-dantas.firebasestorage.app",
  messagingSenderId: "392269020437",
  appId: "1:392269020437:web:0e9c08a8bcb7dd30887d1c",
  measurementId: "G-392TGCNNVN"
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elementos do HTML
const form = document.getElementById("form");
const lista = document.getElementById("lista-feedbacks");

// Função para enviar feedback
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  try {
    await addDoc(collection(db, "feedbacks"), {
      nome,
      email,
      mensagem,
      data: serverTimestamp()
    });

    alert("✅ Feedback enviado com sucesso!");
    form.reset();
  } catch (err) {
    console.error("Erro ao enviar feedback: ", err);
    alert("❌ Erro ao enviar feedback");
  }
});

// Função para listar feedbacks em tempo real
onSnapshot(collection(db, "feedbacks"), (snapshot) => {
  lista.innerHTML = ""; // limpa antes de renderizar
  snapshot.forEach((docSnap) => {
    const dados = docSnap.data();
    const div = document.createElement("div");

    div.innerHTML = `
      <p>
        <strong>${dados.nome}</strong> <br>
        ${dados.mensagem} <br>
        <span class="hora">${dados.data?.toDate().toLocaleString() || ""}</span>
      </p>
      <button class="excluir">Excluir</button>
    `;

    // Função do botão excluir
    div.querySelector(".excluir").addEventListener("click", async () => {
      if (confirm("Tem certeza que deseja excluir este feedback?")) {
        await deleteDoc(doc(db, "feedbacks", docSnap.id));
      }
    });

    lista.appendChild(div);
  });
});
