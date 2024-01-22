import ProductManager from "./ProductManager.js";

// Testing:
const items = new ProductManager('./productos.json');

console.log(items.getProducts());

// Agregar producto 1
items.addProduct({
    title: "Ipad pro 11",
    description: "Potencia y versatilidad en un dispositivo. Rendimiento excepcional, pantalla envolvente y diseño ultradelgado",
    price: 1000,
    thumbnail: "asset/images/ipadpro11.jpg",
    code: 1.0,
    stock: 10

});

// Agregar producto 2
items.addProduct({
    title: "Iphone 13",
    description: "Potencia y versatilidad en un dispositivo. Rendimiento excepcional, pantalla envolvente y diseño ultradelgado",
    price: 500,
    thumbnail: "asset/images/Iphone13.jpg",
    code: 1.1,
    stock: 5
});

// Agregar producto 3
items.addProduct({
    title: "Macbook m1",
    description: "Potencia y versatilidad en un dispositivo. Rendimiento excepcional, pantalla envolvente y diseño ultradelgado",
    price: 2500,
    thumbnail: "asset/images/macbookm1.jpg",
    code: 1.2,
    stock: 12
});

// Check todos los productos
console.log("Productos actuales:", items.getProducts());

// Buscador producto por ID
items.getProductById(10);

// Actualizar producto por ID
items.updateProduct(2, { price: 650 });

// Eliminar producto por ID
items.deleteProduct(5);
