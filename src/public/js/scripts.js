document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Proyecto cargado correctamente");

    // Conexión con WebSocket
    const socket = io();

    // 🛒 Evento para agregar productos al carrito
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.dataset.id;
            try {
                const response = await fetch(`/api/carts/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId, quantity: 1 })
                });

                if (!response.ok) throw new Error("Error al agregar producto");
                alert("✅ Producto agregado al carrito");
            } catch (error) {
                console.error("❌ Error:", error);
            }
        });
    });

    // 🆕 Evento para crear un nuevo producto desde realTimeProducts.handlebars
    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = document.getElementById("title").value;
            const price = document.getElementById("price").value;
            const category = document.getElementById("category").value;

            if (!title || !price || !category) return alert("⚠️ Todos los campos son obligatorios");

            const newProduct = { title, price, category };
            socket.emit("newProduct", newProduct);

            productForm.reset();
        });
    }

    // 🔄 Escuchar cuando se agrega un nuevo producto y actualizar la lista en tiempo real
    socket.on("updateProducts", (products) => {
        const productList = document.getElementById("productList");
        if (productList) {
            productList.innerHTML = "";
            products.forEach(product => {
                productList.innerHTML += `
                    <li>${product.title} - $${product.price} 
                        <button class="delete-product" data-id="${product._id}">🗑 Eliminar</button>
                    </li>
                `;
            });

            // Evento para eliminar productos en tiempo real
            document.querySelectorAll(".delete-product").forEach(button => {
                button.addEventListener("click", (event) => {
                    const productId = event.target.dataset.id;
                    socket.emit("deleteProduct", productId);
                });
            });
        }
    });

    // 🗑 Escuchar cuando se elimina un producto y actualizar la lista
    socket.on("productDeleted", (products) => {
        const productList = document.getElementById("productList");
        if (productList) {
            productList.innerHTML = "";
            products.forEach(product => {
                productList.innerHTML += `
                    <li>${product.title} - $${product.price} 
                        <button class="delete-product" data-id="${product._id}">🗑 Eliminar</button>
                    </li>
                `;
            });
        }
    });
});
