const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.cargarProductos();
    }

    async cargarProductos() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {

            console.log("Error al cargar productos:", error.message);
        }
    }

    async guardarProducto() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products,null,2));
        } catch (error) {
            console.log("Error al guardar productos:", error.message);
        }
    }

    static id = 0;

    addProduct({title, description, price, thumbnail, code, stock}) {
        const newItem = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ++ProductManager.id,
        };

        const missingField = Object.keys(newItem).find(key => newItem[key] === undefined);

        if (!missingField) {
            this.products.push(newItem);
            this.guardarProducto();
        } else {
            console.log(`Falta el campo "${missingField}"`);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if (product) {
            console.log("Producto encontrado: ", product);
        } else {
            console.log("Producto no encontrado con ese ID");
        }
    }

    actualizarProducto(id, updatedFields) {
        const index = this.products.findIndex(item => item.id === id);

        if (index !== -1) {
            const updatedProduct = { ...this.products[index], ...updatedFields, id };
            this.products[index] = updatedProduct;
            this.guardarProducto();
            console.log("Producto actualizado:", updatedProduct);
            return updatedProduct;
        } else {
            console.log("Producto no encontrado con ese ID");
            return null;
        }
    }

    eliminarProducto(id) {
        const index = this.products.findIndex(item => item.id === id);

        if (index !== -1) {
            const productName = this.products[index].title;
            this.products.splice(index, 1);
            this.guardarProducto();
            console.log(`Producto ${productName} eliminado`);
        } else {
            console.log("Producto no encontrado para eliminar");
        }
    }
}

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

// Check todos los productos
console.log("Productos actuales:", items.getProducts());

// Buscador producto por ID
items.getProductById(1);

// Actualizar producto por ID
items.actualizarProducto(2, { price: 650 });

// Eliminar producto por ID
items.eliminarProducto(1);
