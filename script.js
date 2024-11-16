document.addEventListener("DOMContentLoaded", async () => {
    const opcoesContainer = document.getElementById("opcoes-container");
    const finalizarButton = document.getElementById("finalizar");

    let opcoesSelecionadas = [];

    // Carregar opções de arquivo externo
    async function carregarOpcoes() {
        try {
            const response = await fetch("opcoes.json");
            const todasOpcoes = await response.json();

            // Selecionar 12 opções aleatórias
            const opcoesAleatorias = sortearOpcoes(todasOpcoes, 12);
            mostrarOpcoes(opcoesAleatorias);
        } catch (error) {
            console.error("Erro ao carregar as opções:", error);
        }
    }

    // Selecionar N opções aleatórias de um conjunto
    function sortearOpcoes(array, quantidade) {
        const shuffled = array.sort(() => 0.5 - Math.random()); // Embaralha o array
        return shuffled.slice(0, quantidade); // Retorna os primeiros N elementos
    }

    // Exibir opções na tela
    function mostrarOpcoes(opcoes) {
        opcoesContainer.innerHTML = ""; // Limpar o container

        opcoes.forEach((opcao, index) => {
            const div = document.createElement("div");
            div.classList.add("opcao");
            div.textContent = opcao;
            div.dataset.index = index;

            // Adicionar evento de clique
            div.addEventListener("click", () => selecionarOpcao(div));
            opcoesContainer.appendChild(div);
        });
    }

    // Selecionar ou desselecionar uma opção
    function selecionarOpcao(element) {
        const index = element.dataset.index;

        if (opcoesSelecionadas.includes(index)) {
            opcoesSelecionadas = opcoesSelecionadas.filter(
                (item) => item !== index
            );
            element.classList.remove("selecionada");
        } else if (opcoesSelecionadas.length < 6) {
            opcoesSelecionadas.push(index);
            element.classList.add("selecionada");
        }

        finalizarButton.disabled = opcoesSelecionadas.length !== 6;
    }

    // Evento para o botão "Finalizar"
    finalizarButton.addEventListener("click", () => {
        const escolhas = opcoesSelecionadas.map(
            (index) =>
                document.querySelector(`[data-index='${index}']`).textContent
        );

        alert(`Você escolheu:\n${escolhas.join("\n")}`);
    });

    // Inicializar jogo
    carregarOpcoes();
});
