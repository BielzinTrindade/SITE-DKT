document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formOrcamento");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const tipoEvento = document.getElementById("tipoEvento").value;
        const convidados = document.getElementById("convidados").value.trim();
        const data = document.getElementById("data").value;

        if (!nome || !telefone || !cidade || !tipoEvento || !convidados || !data) {
            alert("Preencha todos os campos!");
            return;
        }

        const mensagem =
`Olá, gostaria de solicitar um orçamento!

 Nome: ${nome}
 Telefone / WhatsApp: ${telefone}
 Cidade do evento: ${cidade}
 Tipo de evento: ${tipoEvento}
 Número de convidados: ${convidados}
 Data do evento: ${data}`;

        const numeroWhatsApp = "551971429749"; // TROQUE AQUI

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
    });

});
