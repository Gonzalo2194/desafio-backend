import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();
const PORT = 8080;
const p = new ProductManager('./productos.json');

app.get('/products',(req, res) => {
    const { limit } = req.query;

    if (limit && parseInt(limit) > 0) {
        const productos = p.getProducts(parseInt(limit));
        return res.json({ productos: productos });
    } else {
        return res.json({ error:'El parámetro "limit" es incorrecto.'});
    }
});

app.get('/products/:pid', (req, res) => {
    const {pid} = req.params;
    const producto = p.getProductById(Number(pid));
    return res.json({producto});
    });


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})