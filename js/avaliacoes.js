// ===============================
// 🔥 FIREBASE
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDyby1pNsctl5XF0cfhc3xI-jWAA7kwCRk",
    authDomain: "site-dkt.firebaseapp.com",
    databaseURL: "https://site-dkt-default-rtdb.firebaseio.com",
    projectId: "site-dkt",
    storageBucket: "site-dkt.firebasestorage.app",
    messagingSenderId: "1005657475003",
    appId: "1:1005657475003:web:18bd0cb4858b113542e69e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ===============================
// ⭐ ESTRELAS (CLIQUE)
// ===============================
const stars = document.querySelectorAll('.stars span');
const estrelasInput = document.getElementById('estrelas');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const valor = Number(star.dataset.value);
        estrelasInput.value = valor;

        stars.forEach(s => {
            s.classList.toggle(
                'active',
                Number(s.dataset.value) <= valor
            );
        });
    });
});

// ===============================
// 💾 SALVAR AVALIAÇÃO
// ===============================
function salvarAvaliacao(nome, evento, avaliacao, estrelas) {
    const referencia = ref(database, 'avaliacoes/');
    const novaAvaliacao = push(referencia);

    set(novaAvaliacao, {
        nome,
        evento,
        avaliacao,
        estrelas: Number(estrelas)
    });
}

// ===============================
// 📥 EXIBIR AVALIAÇÕES (SEM MÉDIA)
// ===============================
function exibirAvaliacoes() {
    const referencia = ref(database, 'avaliacoes/');

    get(referencia)
        .then(snapshot => {
            const container = document.getElementById('avaliacoesExibidas');
            container.innerHTML = '';

            if (!snapshot.exists()) {
                container.innerHTML = '<p>Nenhuma avaliação encontrada.</p>';
                return;
            }

            const avaliacoes = snapshot.val();

            for (const id in avaliacoes) {
                const { nome, evento, avaliacao, estrelas } = avaliacoes[id];

                if (!estrelas || estrelas < 1 || estrelas > 5) continue;

                container.innerHTML += `
                    <div class="avaliacao">
                        <h3>${nome}</h3>
                        <div class="stars-view">${'★'.repeat(estrelas)}</div>
                        <p><strong>Evento:</strong> ${evento}</p>
                        <p>${avaliacao}</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar avaliações:', error);
        });
}

// ===============================
// 📨 SUBMIT DO FORMULÁRIO
// ===============================
const form = document.getElementById('formAvaliacao');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const evento = document.getElementById('evento').value.trim();
    const avaliacao = document.getElementById('avaliacao').value.trim();
    const estrelas = Number(estrelasInput.value);

    if (!estrelas) {
        alert('Por favor, selecione as estrelas ⭐');
        return;
    }

    salvarAvaliacao(nome, evento, avaliacao, estrelas);

    form.reset();
    estrelasInput.value = 0;
    stars.forEach(s => s.classList.remove('active'));

    exibirAvaliacoes();
});

// ===============================
// 🚀 CARREGAR AO ABRIR
// ===============================
window.onload = exibirAvaliacoes;
