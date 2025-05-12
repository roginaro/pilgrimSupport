

// Detecta o idioma com base na URL

const path = window.location.pathname;
const langCode = path.includes('/pt/') ? 'Pt' : 'En';

//Descomente esta linha para evitar cache durante o desenvolvimento
//Comente esta linha para produção (sem cache buster)
const cacheBuster = `?v=${Date.now()}`;

const jsonUrl = `https://roginaro.github.io/pilgrimSupport/assets/js/lang${langCode}.json${cacheBuster}`;

fetch(jsonUrl)

    .then(response => response.json())
    .then(lang => {
        console.log(lang);
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

