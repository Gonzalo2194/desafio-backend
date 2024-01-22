import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();
const PORT = 8080;
const p = new ProductManager('./productos.json');

app.get('/products',(req, res) => {
    const {limit} = req.query;
    const productos= p.getProducts(limit);
    return res.json({productos: productos});
});

app.get('/products/:pid', (req, res) => {
    const {pid} = req.params;
    const producto = p.getProductById(Number(pid));
    return res.json({producto});
    });


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})