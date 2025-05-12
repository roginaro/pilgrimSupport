

// Detecta o idioma com base na URL
const path = window.location.pathname;
const jsonUrl = path.includes('/pt/') ? '../assets/js/langPt.json' : '../assets/js/langEn.json';
fetch(jsonUrl)
    .then(response => response.json())
    .then(lang => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const path = el.getAttribute('data-i18n').split('.');
            let value = lang;
            for (const key of path) {
                value = value?.[key];
                if (value === undefined) break;
            }
            if (value !== undefined) {
                el.textContent = value;
            }
        });
    })
    .catch(error => console.error('Erro ao carregar JSON:', error));
