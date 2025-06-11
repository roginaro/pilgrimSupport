document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const pharmacyId = params.get("id");

    console.log("Farmácia ID:", pharmacyId); // Para depuração

    if (!pharmacyId) {
        document.getElementById("pharmacy-info").innerHTML = "<p>Erro: ID da farmácia não encontrado.</p>";
        return;
    }

    fetch("../../assets/data/pharmacies.json?v=" + Date.now())
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar o JSON");
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados do JSON carregados:", data); // Para depuração

            if (!data.pharmacies || data.pharmacies.length === 0) {
                document.getElementById("pharmacy-info").innerHTML = "<p>Erro: Nenhuma farmácia encontrada.</p>";
                return;
            }

            const pharmacy = data.pharmacies.find(p => p.id == pharmacyId);
            if (pharmacy) {
                document.title = pharmacy.name + " - Detalhes";
                document.getElementById("pharmacy-title").textContent = pharmacy.name;
                document.getElementById("pharmacy-name").textContent = pharmacy.name;

                let info = `
                    <p><strong>Endereço:</strong> <a href="${pharmacy.mapsLink}" target="_blank" class="text-decoration-none text-primary">
                        ${pharmacy.address} <i class="fas fa-map-marker-alt"></i>
                    </a></p>
                    <p><strong>Horário de funcionamento:</strong> ${pharmacy.hours}</p>
                    <p><strong>Serviços disponíveis:</strong> ${pharmacy.services ? pharmacy.services.join(", ") : "Não informado"}</p>
                    <div class="d-flex justify-content-center gap-2 mt-4">
                        <a href="https://wa.me/${pharmacy.whatsapp}" class="btn btn-success btn-sm px-2" target="_blank">
                            <i class="fab fa-whatsapp fa-lg"></i>
                        </a>
                        <a href="${pharmacy.instagram}" class="btn btn-sm px-2" target="_blank" style="background: linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5); color: white;">
                            <i class="fab fa-instagram fa-lg"></i>
                        </a>
                        <a href="${pharmacy.facebook}" class="btn btn-sm px-2" target="_blank" style="background-color: #1877F2; color: white;">
                            <i class="fab fa-facebook fa-lg"></i>
                        </a>
                    </div>
                `;
                document.getElementById("pharmacy-info").innerHTML = info;
            } else {
                document.getElementById("pharmacy-info").innerHTML = "<p>Erro: Farmácia não encontrada.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            document.getElementById("pharmacy-info").innerHTML = "<p>Erro ao carregar as informações.</p>";
        });
});
