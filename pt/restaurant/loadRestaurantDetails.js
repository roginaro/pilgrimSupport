document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get("id");

    console.log("Restaurante ID:", restaurantId); // Para depuração

    if (!restaurantId) {
        document.getElementById("restaurant-info").innerHTML = "<p>Erro: ID do restaurante não encontrado.</p>";
        return;
    }

    fetch("../../assets/data/restaurants.json?v=" + Date.now()) // Ajustando caminho do JSON
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar o JSON");
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados do JSON carregados:", data); // Para depuração

            if (!data.restaurants || data.restaurants.length === 0) {
                document.getElementById("restaurant-info").innerHTML = "<p>Erro: Nenhum restaurante encontrado.</p>";
                return;
            }

            const restaurant = data.restaurants.find(r => r.id == restaurantId);
            if (restaurant) {
                document.getElementById("restaurant-title").textContent = restaurant.name;
                document.getElementById("restaurant-name").textContent = restaurant.name;

                let info = `
                    <p><strong>Endereço:</strong> <a href="${restaurant.mapsLink}" target="_blank" class="text-decoration-none text-primary">
                        ${restaurant.address} <i class="fas fa-map-marker-alt"></i>
                    </a></p>
                    <p><strong>Horário de funcionamento:</strong> ${restaurant.hours}</p>
                    <p><strong>Serviços disponíveis:</strong> ${restaurant.services ? restaurant.services.join(", ") : "Não informado"}</p>
                    <div class="d-flex justify-content-center gap-2 mt-4">
                        <a href="https://wa.me/${restaurant.whatsapp}" class="btn btn-success btn-sm px-2" target="_blank">
                            <i class="fab fa-whatsapp fa-lg"></i>
                        </a>
                        <a href="${restaurant.instagram}" class="btn btn-sm px-2" target="_blank" style="background: linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5); color: white;">
                            <i class="fab fa-instagram fa-lg"></i>
                        </a>
                        <a href="${restaurant.facebook}" class="btn btn-sm px-2" target="_blank" style="background-color: #1877F2; color: white;">
                            <i class="fab fa-facebook fa-lg"></i>
                        </a>
                    </div>
                `;
                document.getElementById("restaurant-info").innerHTML = info;
            } else {
                document.getElementById("restaurant-info").innerHTML = "<p>Erro: Restaurante não encontrado.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            document.getElementById("restaurant-info").innerHTML = "<p>Erro ao carregar as informações.</p>";
        });
});
