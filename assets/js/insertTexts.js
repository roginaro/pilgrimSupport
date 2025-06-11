// Detecta o idioma com base na URL
const path = window.location.pathname;
const langCode = path.includes('/pt/') ? 'Pt' : 'En';

// Evita cache durante o desenvolvimento
const cacheBuster = '?v=${Date.now()}';
const domain = 'https://roginaro.github.io/pilgrimSupport/assets'
// URLs dos arquivos JSON
const jsonFiles = {
    restaurants: domain+'/data/restaurants.json',
    pharmacies: domain+'/data/pharmacies.json',
    others: domain+'/data/others.json',
    useful_services: domain+'/data/useful_services.json',
    lang: domain+'/js/lang'+langCode+'.json'
};

// Função para carregar JSON
function loadJSON(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar JSON: ${response.statusText}');
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error("Erro ao carregar JSON:", error));
}

// Atualiza os textos da página
function updateTexts(jsonData, prefix) {
    document.querySelectorAll('[data-i18n^="${prefix}."]').forEach(el => {
        const keys = el.getAttribute("data-i18n").split(".");
        let value = jsonData;

        keys.forEach(key => {
            if (value && value[key]) {
                value = value[key];
            } else {
                value = null;
            }
        });

        if (value) {
            el.textContent = value;
        }
    });
}

// Carrega e preenche os serviços
document.addEventListener("DOMContentLoaded", function () {
    // Carrega o JSON de idioma primeiro para atualizar os textos
    loadJSON(jsonFiles.lang, data => {
        updateTexts(data, "useful_services");
        updateTexts(data, "btnGeral"); // Para botão "Voltar"
    });

    // Carrega os serviços úteis do banco de dados
    loadJSON(jsonFiles.useful_services, data => {
        const servicesList = document.getElementById("services-list");
        if (servicesList && data.services) {
            data.services.forEach(service => {
                const item = document.createElement("div");
                item.classList.add("list-group-item");
                item.innerHTML = `<h5 class="mb-1" data-i18n="useful_services.services.${service.id}.title">${service.name}</h5>
                    <p class="mb-1" data-i18n="useful_services.services.${service.id}.desc">${service.desc}</p>
                    <div class="text-end mt-3">
                        <a href="${service.id}/details.html" class="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1"
                            title="Ver mais detalhes">
                            <i class="fas fa-search"></i>
                            <span data-i18n="useful_services.lbl_viewMore">Ver mais</span>
                        </a>
                    </div>`;
                servicesList.appendChild(item);
            });
        } else {
            servicesList.innerHTML = "<p class='text-danger'>Nenhum serviço disponível no momento.</p>";
        }
    });
});


