/* 
Consigna:
- Realizar una clase “ProductManager” que gestione un conjunto de productos. - DONE
- Constructor con el elemento products, el cual será un arreglo vacío - DONE
- Cada producto que gestione debe contar con las propiedades:
    title (nombre del producto)
    description (descripción del producto)
    price (precio)
    thumbnail (ruta de imagen)
    code (código identificador)
    stock (número de piezas disponibles)

- Método “addProduct” el cual agregará un producto al arreglo de productos inicial. - DONE
    Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    Al agregarlo, debe crearse con un id autoincrementable - Done

- Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta 
ese momento - Done
- Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id 
(En caso de no coincidir ningún id, mostrar en consola un error “Not found”).
*/

class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0;

    addProduct(title, description, price, thumbnail, code, stock) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`El código ${code} está repetido`);
                return;
            }
        }

    const newItem = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
}

    if(!Object.values(newItem).includes(undefined)){
            ProductManager.id++;
            this.products.push({
            ...newItem,
            id: ProductManager.id
            });
        }else{
            console.log("Se requieren todos los campos")
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
            console.log("No encontrado");
        }
    }
}

const items = new ProductManager();
// chequeo agregar producto con areglo vacio
console.log(items.getProducts());

items.addProduct("Ipad pro 11", "Potencia y versatilidad en un dispositivo. Rendimiento excepcional, pantalla envolvente y diseño ultradelgado", 1000, "asset/images/ipadpro11.jpg", 1.0, 5);
items.addProduct("Iphone 13", "Potente, elegante, innovador.", 1500, "asset/images/iphone13.jpg", 1.1, 8 ); 

// chequeo agregar producto 
console.log(items.getProducts());

// chequeo de producto encontrado
items.getProductById(5);



