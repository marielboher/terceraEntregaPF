const socket = io();
socket.on("initial_products", function (products) {
  products.forEach((product) => {
    displayProduct(product);
  });
});

function displayProduct(newProduct) {
  var productElement = document.createElement("li");
  productElement.id = "product-" + newProduct._id;
  productElement.className = "product";

  var imageElement = document.createElement("img");
  imageElement.src = newProduct.thumbnails;
  imageElement.alt = newProduct.title;
  productElement.appendChild(imageElement);

  var textElement = document.createElement("span");
  textElement.textContent =
    "Producto: " +
    newProduct.title +
    " - Stock: " +
    newProduct.stock +
    " - Descripción: " +
    newProduct.description;
  productElement.appendChild(textElement);

  document.getElementById("productList").appendChild(productElement);

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.className = "delete-button";
  deleteButton.dataset.id = newProduct._id;
  productElement.appendChild(deleteButton);

  var editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.className = "edit-button";
  editButton.dataset.id = newProduct._id;
  productElement.appendChild(editButton);

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-button")) {
      const id = e.target.dataset.id;
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Producto eliminado:", id);
          socket.emit("delete_product", { id });
        } else {
          console.error("Error eliminando el producto:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (e.target.classList.contains("edit-button")) {
      const id = e.target.dataset.id;
      const productElement = document.getElementById(`product-${id}`);
    }
  });
}

socket.on("product_created", function (newProduct) {
  console.log("Nuevo producto:", newProduct);

  var productElement = document.createElement("li");
  productElement.id = "product-" + newProduct._id;
  productElement.className = "product";

  var imageElement = document.createElement("img");
  imageElement.src = newProduct.thumbnails;
  imageElement.alt = newProduct.title;
  productElement.appendChild(imageElement);

  var textElement = document.createElement("span");
  textElement.textContent =
    "Producto: " +
    newProduct.title +
    " - Stock: " +
    newProduct.stock +
    " - Descripción: " +
    newProduct.description;
  productElement.appendChild(textElement);

  document.getElementById("productList").appendChild(productElement);
});

socket.on("product_deleted", function (data) {
  console.log("Producto eliminado:", data._id);

  var productElement = document.getElementById("product-" + data._id);

  if (productElement) {
    console.log("Producto encontrado en el DOM:", productElement);

    productElement.remove();

    productElement = document.getElementById("product-" + data._id);
    if (!productElement) {
      console.log("Producto eliminado exitosamente del DOM.");
    } else {
      console.log("Error: El producto no se eliminó del DOM.");
    }
  } else {
    console.log("Error: Producto no encontrado en el DOM.");
  }
});

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const thumbnails = document.getElementById("thumbnails").value;
  const productId = document.getElementById("productId").value;

  let url = "/api/products/";
  let method = "POST";

  if (productId) {
    url += productId;
    method = "PUT";
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      // Actualizar la UI conforme sea necesario
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

document.querySelectorAll(".edit-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.getAttribute("data-id");
    const product = getProductById(productId); 
    if (product) {
      document.getElementById("editTitle").value = product.title;
      document.getElementById("editDescription").value = product.description;
      document.getElementById("editCode").value = product.code;
      document.getElementById("editPrice").value = product.price;
      document.getElementById("editStock").value = product.stock;
      document.getElementById("editCategory").value = product.category;
      document.getElementById("editThumbnails").value = product.thumbnails;
      document.getElementById("editProductId").value = productId;
      document.getElementById("editProductForm").style.display = "block";
    }
  });
});
