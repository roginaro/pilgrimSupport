document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const businessId = params.get("id");

    console.log("Estabelecimento ID:", businessId); // Para depuração

    if (!businessId) {
        document.getElementById("business-info").innerHTML = "<p>Erro: ID do estabelecimento não encontrado.</p>";
        return;
    }

    fetch("../../assets/data/others.json?v=" + Date.now())
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao acessar o JSON");
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados do JSON carregados:", data); // Para depuração

            if (!data.businesses || data.businesses.length === 0) {
                document.getElementById("business-info").innerHTML = "<p>Erro: Nenhum estabelecimento encontrado.</p>";
                return;
            }

            const business = data.businesses.find(b => b.id == businessId);
            if (business) {
                document.title = business.name + " - Detalhes";
                document.getElementById("business-title").textContent = business.name;
                document.getElementById("business-name").textContent = business.name;


                let info = `
                    <p><strong>Address:</strong> <a href="${business.mapsLink}" target="_blank" class="text-decoration-none text-primary">
                        ${business.address} <i class="fas fa-map-marker-alt"></i>
                    </a></p>
                    <p><strong>Opening hours:</strong> ${business.hours}</p>
                    <p><strong>Available services:</strong> ${business.services ? business.services.join(", ") : "Não informado"}</p>
                    <div class="d-flex justify-content-center gap-2 mt-4">
                        <a href="https://wa.me/${business.whatsapp}" class="btn btn-success btn-sm px-2" target="_blank">
                            <i class="fab fa-whatsapp fa-lg"></i>
                        </a>
                        <a href="${business.instagram}" class="btn btn-sm px-2" target="_blank" style="background: linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5); color: white;">
                            <i class="fab fa-instagram fa-lg"></i>
                        </a>
                        <a href="${business.facebook}" class="btn btn-sm px-2" target="_blank" style="background-color: #1877F2; color: white;">
                            <i class="fab fa-facebook fa-lg"></i>
                        </a>
                    </div>
                `;
                document.getElementById("business-info").innerHTML = info;
            } else {
                document.getElementById("business-info").innerHTML = "<p>Erro: Estabelecimento não encontrado.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            document.getElementById("business-info").innerHTML = "<p>Erro ao carregar as informações.</p>";
        });
});
