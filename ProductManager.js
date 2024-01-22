//const fs = require('fs').promises;

//import fs from 'fs';

import { promises as fs } from 'fs';
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

    async addProduct({title, description, price, thumbnail, code, stock}) {
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
            await this.guardarProducto()
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

    async updateProduct(id, updatedFields) {
        const index = this.products.findIndex(item => item.id === id);

        if (index !== -1) {
            const updatedProduct = { ...this.products[index], ...updatedFields, id };
            this.products[index] = updatedProduct;
            await this.guardarProducto()
            console.log("Producto actualizado:", updatedProduct);
            return updatedProduct;
        } else {
            console.log("Producto no encontrado con ese ID");
            return null;
        }
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(item => item.id === id);

        if (index !== -1) {
            const productName = this.products[index].title;
            this.products.splice(index, 1);
            await this.guardarProducto() 
            console.log(`Producto ${productName} eliminado`);
        } else {
            console.log("Producto no encontrado para eliminar");
        }
    }
}


export default ProductManager;