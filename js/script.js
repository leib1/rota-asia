
/* =========================================
   1. TEMA CLARO E ESCURO
========================================= */

const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const isDark = document.body.dataset.theme === "dark";

        if (isDark) {
            document.body.dataset.theme = "light";
            themeButton.textContent = "☾";
            themeButton.setAttribute("aria-label", "Ativar tema escuro");
            themeButton.setAttribute("aria-pressed", "false");
        } else {
            document.body.dataset.theme = "dark";
            themeButton.textContent = "☀";
            themeButton.setAttribute("aria-label", "Ativar tema claro");
            themeButton.setAttribute("aria-pressed", "true");
        }
    });
}

/* =========================================
   2. PESQUISA E FILTROS DOS DESTINOS
========================================= */

// Seleciona os elementos da página inicial
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

    destinationCards.forEach(card => {
        const searchableText = normalizeText(card.dataset.search);
        const categories = card.dataset.category.split(" ");

        const matchesSearch = searchableText.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            categories.includes(selectedCategory);

        const isVisible = matchesSearch && matchesCategory;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    if (searchFeedback) {
        searchFeedback.hidden = visibleCount !== 0;
    }
}

// Só ativa a pesquisa se os elementos existirem
if (searchInput && destinationCards.length > 0) {
    searchInput.addEventListener("input", filterDestinations);
}

// Eventos dos botões de categoria
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        if (searchInput) {
            filterDestinations();
        }
    });
});
