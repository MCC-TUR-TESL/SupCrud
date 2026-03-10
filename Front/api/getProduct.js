const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const getProductById = async (productId) => {
    const respuesta = await fetch("http://localhost:3000/products/" + productId, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const data = await respuesta.json();
    return data;
}
//console.log(product); // "3"
const product = await getProductById(productId);
document.querySelector(".name-product").textContent = product.name;
document.querySelector(".product-img-box").innerHTML = `<img src="${product.images}" alt="Cinta">`;

async function cargarEstadoProducto() {
    const respuesta = await fetch(
        `http://localhost:3000/product_state/${product.product_state}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
    );

    const data = await respuesta.json();
    // agregar filtro por publicado, agotado o Borrado

    document.querySelector("#dispo").innerHTML = `
    <div><b>Disponibilidad:</b><span> ${product.stock} Unidades</span></div>
  `;
}

cargarEstadoProducto();

document.querySelector("#pre-price").innerHTML = `<div class=""><b>Precio anterior:</b></div>
                                                    <div class="price-before">$ ${product.price + 10}</div>`;
document.querySelector("#current-price").innerHTML = `<div><b>Precio actual:</b></div>
                                                        <div class="price-after bg-success w-50 text-white text-lg-center">$ ${product.price}</div>`;



document.querySelector(".description-product").textContent = product.description;


// buttons
document.querySelector("#buy-now").addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: '¡Compra exitosa! 🛒',
        text: 'Tu producto fue comprado correctamente.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#000000',
        color: '#facc15', // amarillo
        iconColor: '#facc15'
    });
    console.log(product.stock);

    product.stock -= 1;
    console.log(product.stock);
    console.log(product);

    async function cargarEstadoProducto() {
        const respuesta = await fetch(
            `http://localhost:3000/products/${product.id}`,
            {
                method: "PUT",
                body: JSON.stringify(product),
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    cargarEstadoProducto();

    const params = new URLSearchParams({
        name: product.name,
        description: product.description,
        price: String(product.price),
        id: String(product.id),
    });

    window.open(`https://buy-buddy-route.lovable.app/payment?${params.toString()}`, "_blank");

});

document.querySelector("#wpp").addEventListener('click', () => {
    const cel = '5733333333333';
    const message = `Hola ToolStore, me interesa el producto '${product.name}' de precio: ${product.price}`
    window.open(
        `https://wa.me/${cel}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
});