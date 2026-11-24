
/* =========================================
   PESQUISA E FILTROS DOS DESTINOS
========================================= */

// Seleciona os elementos do HTML
const searchInput = document.querySelector("#destination-search");

const filterButtons = document.querySelectorAll(".filter-button");

const destinationCards = document.querySelectorAll(".destination-card");

const searchFeedback = document.querySelector("#search-feedback");

// Armazena a categoria selecionada
let selectedCategory = "all";

// Remove acentos e padroniza o texto
function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

// Executa a pesquisa e os filtros
function filterDestinations() {

    const searchTerm = normalizeText(searchInput.value);

    let visibleCount = 0;

    // Percorre todos os cards
    destinationCards.forEach(card => {

        const searchableText = normalizeText(
            card.dataset.search
        );

        const categories = card.dataset.category.split(" ");

        // Verifica se corresponde à pesquisa
        const matchesSearch = searchableText.includes(searchTerm);

        // Verifica se corresponde à categoria
        const matchesCategory =
            selectedCategory === "all" ||
            categories.includes(selectedCategory);

        // Define se o card deve aparecer
        const isVisible = matchesSearch && matchesCategory;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }

    });

    // Exibe mensagem quando não existem resultados
    searchFeedback.hidden = visibleCount !== 0;

}

// Pesquisa enquanto o usuário digita
searchInput.addEventListener("input", filterDestinations);

// Eventos dos botões de categoria
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Atualiza a categoria selecionada
        selectedCategory = button.dataset.filter;

        // Atualiza o botão ativo
        filterButtons.forEach(item => {

            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");

        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Atualiza os resultados
        filterDestinations();

    });

});
