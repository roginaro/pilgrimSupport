document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("id");

    fetch("/assets/data/useful_services.json?v=" + Date.now()) 
        .then(response => response.json())
        .then(data => {
            const service = data.services.find(s => s.id === serviceId);
            if (service) {
                document.title = service.name + " - Details";
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

                // Update specific icons
                let iconHTML = "";
                if (service.name.includes("Mercado")) {
                    iconHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
                } else if (service.name.includes("Lavandaria")) {
                    iconHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
                } else {
                    iconHTML = `<i class="fa-solid fa-shuttle-van menu-icon"></i>`; // Ícone padrão
                }

                document.querySelector(".page-title").innerHTML = `${iconHTML} <span id="service-name">${service.name}</span>`;

                let detailsHTML = "";

                // Maintain destinations without displaying "Destinations" title
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
                            reference = "Historic city, famous for the Barcelos Rooster and its crafts.";
                        }
                        if (destination.name.includes("Central de Camionagem")) {
                            cardColor = "background-color: #69A3B5; color: black;"; // Azul mais claro, fonte preta
                            distance = "15 km";
                            estimatedTime = "20 min";
                            reference = "Great connection for regional and national travel.<br><br>";
                        }
                        if (destination.name.includes("Outlet Vila do Conde")) {
                            cardColor = "background-color: #D2B48C; color: black;";
                            distance = "9 km";
                            estimatedTime = "10 min";
                            reference = "The best shopping destination with unbeatable discounts.";
                        }

                        detailsHTML += `
                            <div class="col-md-4">
                                <div class="card shadow-sm p-3" style="${cardColor}">
                                    <h5>${destination.name}</h5>
                                    <p>Estimated Time: ${estimatedTime}</p>
                                    <p>Distance: ${distance}</p>
                                    <p>${reference}</p>
                                </div>
                            </div>
                        `;
                    });

                    detailsHTML += `</div>`;
                }

                document.getElementById("service-details").innerHTML = detailsHTML;

                // Add extra details below the cards
                let extraDetailsHTML = "";

                if (service.bus_departures) {
                    extraDetailsHTML += `<h3 class="mt-4">Bus Departures</h3><ul class="list-group">`;
                    service.bus_departures.forEach(bus => {
                        extraDetailsHTML += `
                            <li class="list-group-item">
                                <strong>${bus.destination}</strong> - Times: ${bus.times.join(", ")} - Cost: ${bus.cost}
                            </li>
                        `;
                    });
                    extraDetailsHTML += `</ul>`;
                }

                if (service.tour_companies) {
                    extraDetailsHTML += `<h3 class="mt-4">Transport Companies</h3><ul class="list-group">`;
                    service.tour_companies.forEach(company => {
                        extraDetailsHTML += `
                            <li class="list-group-item">
                                <strong>${company.name}</strong> - Contact: ${company.contact} - 
                                <a href="https://wa.me/${company.whatsapp}" class="btn btn-success btn-sm px-2" target="_blank">
                                    <i class="fab fa-whatsapp fa-lg"></i>
                                </a>
                            </li>
                        `;
                    });
                    extraDetailsHTML += `</ul>`;
                }

                if (service.features) {
                    extraDetailsHTML += `<h3 class="mt-4">Features</h3><ul class="list-group">`;
                    service.features.forEach(feature => {
                        extraDetailsHTML += `<li class="list-group-item">${feature}</li>`;
                    });
                    extraDetailsHTML += `</ul>`;
                }

                if (service.hours) {
                    extraDetailsHTML += `<p class="mt-4"><strong>Opening hours:</strong> ${service.hours}</p>`;
                }

                if (service.contact_info) {
                    extraDetailsHTML += `<p class="mt-2">${service.contact_info}</p>`;
                }

                document.getElementById("service-extra-details").innerHTML = extraDetailsHTML;
            }
        })
        .catch(error => {
            console.error("Error loading data:", error);
            document.getElementById("service-details").innerHTML = "<p>Error loading information.</p>";
        });
});
