document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("id");

    fetch("https://roginaro.github.io/pilgrimSupport/assets/data/useful_services.json?v=" + Date.now()) 
        .then(response => response.json())
        .then(data => {
            const service = data.services.find(s => s.id === serviceId);
            if (service) {
                document.title = service.name + " - Detalhes";
                document.getElementById("service-name").textContent = service.name;

                // Ajusta a descrição e adiciona quebra de linha conforme solicitado
                let serviceDescription = service.description;
                if (service.name.includes("Lavandaria")) {
                    serviceDescription = serviceDescription.replace("rápido", "<br>rápido");
                }
                if (service.name.includes("Mercado")) {
                    serviceDescription = serviceDescription.replace("comidas", "<br>comidas");
                }
                document.getElementById("service-description").innerHTML = serviceDescription;

                // Atualização dos ícones específicos
                let iconHTML = "";
                if (service.name.includes("Mercado")) {
                    iconHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
                } else if (service.name.includes("Lavandaria")) {
                    iconHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
                } else {
                    iconHTML = `<i class="fa-solid fa-shuttle-van menu-icon"></i>`; // Ícone padrão
                }
                
                document.querySelector(".page-title").innerHTML = `${iconHTML} <span id="service-name">${service.name}</span>`;

                // Ocultar imagem para serviços específicos
                if (service.name.includes("Lavandaria") || service.name.includes("Mercado")) {
                    document.getElementById("service-image").style.display = "none"; 
                } else {
                    document.getElementById("service-image").remove();
                }

                let detailsHTML = "";

                // Mantém os destinos sem exibir o título "Destinos"
                if (service.destinations && service.destinations.length > 0) {
                    detailsHTML += `<div class="row">`;

                    service.destinations.forEach(destination => {
                        let cardColor = "";
                        let distance = "";
                        let reference = "";
                        let estimatedTime = "";

                        if (destination.name.includes("Barcelos")) {
                            cardColor = "background-color: #CC6666; color: black;";
                            distance = "35 km";
                            estimatedTime = "40 min";
                            reference = "Cidade histórica, famosa pelo Galo de Barcelos e seu artesanato.";
                        }
                        if (destination.name.includes("Central de Camionagem")) {
                            cardColor = "background-color: #69A3B5; color: black;"; // Azul mais claro, fonte preta
                            distance = "15 km";
                            estimatedTime = "20 min";
                            reference = "Ótima conexão para viagens regionais e nacionais.<br><br>";
                        }
                        if (destination.name.includes("Outlet Vila do Conde")) {
                            cardColor = "background-color: #D2B48C; color: black;";
                            distance = "9 km";
                            estimatedTime = "10 min";
                            reference = "O melhor destino para compras com descontos imperdíveis.";
                        }

                        detailsHTML += `
                            <div class="col-md-4">
                                <div class="card shadow-sm p-3" style="${cardColor}">
                                    <h5>${destination.name}</h5>
                                    <p>Tempo estimado: ${estimatedTime}</p>
                                    <p>Distância: ${distance}</p>
                                    <p>${reference}</p>
                                </div>
                            </div>
                        `;
                    });

                    detailsHTML += `</div>`;
                }

                document.getElementById("service-details").innerHTML = detailsHTML;

                // Adicionar detalhes extras abaixo dos cartões
                let extraDetailsHTML = "";
                if (service.bus_departures) {
                    extraDetailsHTML += `<h3 class="mt-4">Saídas de Ônibus</h3><ul class="list-group">`;
                    service.bus_departures.forEach(bus => {
                        extraDetailsHTML += `
                            <li class="list-group-item">
                                <strong>${bus.destination}</strong> - Horários: ${bus.times.join(", ")} - Custo: ${bus.cost}
                            </li>
                        `;
                    });
                    extraDetailsHTML += `</ul>`;
                }

                if (service.tour_companies) {
                    extraDetailsHTML += `<h3 class="mt-4">Empresas de Transporte</h3><ul class="list-group">`;
                    service.tour_companies.forEach(company => {
                        extraDetailsHTML += `
                            <li class="list-group-item">
                                <strong>${company.name}</strong> - Contato: ${company.contact} - 
                                <a href="https://wa.me/${company.whatsapp}" class="btn btn-success btn-sm px-2" target="_blank">
                                    <i class="fab fa-whatsapp fa-lg"></i>
                                </a>
                            </li>
                        `;
                    });
                    extraDetailsHTML += `</ul>`;
                }

                if (service.features) {
                    service.features.forEach(feature => {
                        extraDetailsHTML += `<li class="list-group-item">${feature}</li>`;
                    });
                    extraDetailsHTML += `</ul>`;
                }

                if (service.hours) {
                    extraDetailsHTML += `<p class="mt-4"><strong>Horário de funcionamento:</strong> ${service.hours}</p>`;
                }

                if (service.contact_info) {
                    extraDetailsHTML += `<p class="mt-2">${service.contact_info}</p>`;
                }

                document.getElementById("service-extra-details").innerHTML = extraDetailsHTML;
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            document.getElementById("service-details").innerHTML = "<p>Erro ao carregar as informações.</p>";
        });
});
