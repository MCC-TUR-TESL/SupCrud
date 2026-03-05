async function renderCards() {
    try {
        // Obtener contenedores de categorías según tu HTML
        const containerOne = document.getElementById("cardsContainerOne"); // Maquinaria y Equipos
        const containerTwo = document.getElementById("cardsContainerTwo"); // Herramientas de Mano
        const containerThree = document.getElementById("cardsContainerThree"); // Plomería y Gas
        const containerFour = document.getElementById("cardsContainerFour"); // Pintura y Acabados

        // Traer productos y estados
        const [productsRes, statesRes] = await Promise.all([
            fetch("http://localhost:3000/products"),
            fetch("http://localhost:3000/product_state")
        ]);

        const products = await productsRes.json();
        const states = await statesRes.json();

        // ID del estado "Publicado"
        const publishedState = states.find(s => s.state === "Publicado")?.id;

        if (!publishedState) {
            console.error("No se encontró el estado 'Publicado' en product_state");
            return;
        }

        // Limpiar contenedores
        containerOne.innerHTML = containerOne.innerHTML; // Mantener títulos existentes
        containerTwo.innerHTML = containerTwo.innerHTML;
        containerThree.innerHTML = containerThree.innerHTML;
        containerFour.innerHTML = containerFour.innerHTML;

        // Recorrer productos y agregarlos al contenedor correcto
        products.forEach(product => {
            // Solo productos publicados
            if (String(product.product_state) !== String(publishedState)) return;

            const productCard = `
                <div class="col-12 col-md-6 col-lg-3 mb-4">
                    <article class="card p-3 d-flex flex-column align-items-center">
                        <div class="card-img w-50 h-50">
                            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between w-100">
                            <h5 class="card-title text-center">${product.name}</h5>
                            <p class="card-text text-center fw-bold text-success">
                                $${product.price.toLocaleString('es-CO')}
                            </p>
                            <a href="./details.html?id=${product.id}" class="btn btn-warning w-100 general-button">
                                Ver Detalles
                            </a>
                        </div>
                    </article>
                </div>
            `;

            // Agregar al contenedor según category_id
            switch (String(product.category_id)) {
                case "1":
                    containerOne.innerHTML += productCard;
                    break;
                case "2":
                    containerFour.innerHTML += productCard; // Pintura y Acabados
                    break;
                case "3":
                    containerTwo.innerHTML += productCard; // Herramientas de Mano
                    break;
                case "4":
                    containerThree.innerHTML += productCard; // Plomería y Gas
                    break;
                default:
                    console.warn("Producto con category_id desconocido:", product);
            }
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

// Ejecutar la función al cargar la página
renderCards();
