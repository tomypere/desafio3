import express from "express"
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../desafio/data/fs/index.js";


const port = 8080
const ready = console.log("server ready on port " + port)
const app = express()

app.listen(port, ready)

app.use(express.urlencoded({ extended: true }));

app.get("/", index)
app.get("/products", read);
app.get("/products/:pId", readID)

function index(req, res) {
    try {
        const message = "Welcome to coder-products";
        return res.json({ status: 200, response: message });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}

async function read(req, res) {
    try {
        const limit = req.query.limit;
        const all = await getProducts();
        if (limit) {
            all = all.slice(0, parseInt(limit));
        }
        if (all.length > 0) {
            return res.json({ status: 200, response: all });
        } else {
            return res.json({ status: 404, response: "Not found" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}

async function readID(req, res) {
    try {
        const { pId }  = req.params;
        const one = await getProductById(pId);
        if (one) {
            return res.json({ status: 200, response: one });
        } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status || 500,
            response: error.message || "ERROR",
        });
    }
}