import fs from "fs";
import path from "path";

let products = [];
/* let pathFile = "../fs/files/products.json" */
let pathFile = "../desafio/data/fs/files/products.json"


const addProduct = async (title, description, price, thumbnail, code, stock) => {

    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }

    if(Object.values(newProduct).includes(undefined)){
        console.log("Todos los campos son obligatorios")
        return
    }

    const productExist = products.find( product => product.code === code);
    if(productExist){
        console.log(`El producto ${title} con el código ${code} ya existe`)
        return
    }

    products.push(newProduct);

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

const getProducts = async () => {

    console.log(pathFile)
    const productsJson =  await fs.promises.readFile(pathFile, "utf8")
    products = JSON.parse(productsJson) || [];

    return products;
}

const getProductById = async (id) => {
    await getProducts();
    const numericId = parseInt(id);
    const product = products.find(product => product.id === numericId);
    if (!product) {
        console.log(`No se encontro el producto con el ID ${id}`);
        return;
    }

    console.log(product);
    return product;
}


const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index = products.findIndex( product => product.id === id);
    products[index] = {
        ...products[index],
        ...dataProduct
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(products))

}

const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter( product => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products))
}

//Test

/* addProduct("Producto 1", "el primer producto", 299, "http://www.google.com", "ADF123", 10);
addProduct("Producto 2", "el segundo producto", 899, "http://www.google.com", "ADF124", 10);
addProduct("Producto 3", "el tercer producto", 899, "http://www.google.com", "ADF124", 10);
addProduct("Producto 4", "el cuarto producto", 899, "http://www.google.com", "ADF125", 10);
addProduct("Producto 5", "el quinto producto", 899, "http://www.google.com", "ADF126"); */

//getProducts();

//getProductById(2)

/* updateProduct(3, {
    "title": "Producto 3",
    "description": "el tercer producto"
}); */

/* deleteProduct(2) */

export { addProduct, getProducts, getProductById, updateProduct, deleteProduct }