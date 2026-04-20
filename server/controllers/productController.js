import Product from "../Models/products.js";
import fs from 'fs'

export const addProduct = async (req, res) => {

    try {

        const { name, price, category, stock, dis } = req.body;
        const img = req.file ? `/uploads/${req.file.filename}` : ""
        const product = new Product({
            name,
            price,
            category,
            stock,
            dis,
            img,
        })
        await product.save()
        res.status(201).json({
            message: "Product added",
            product
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }



}

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.find().sort({ createdAt: -1 })

        if (!product) {
            const err = new Error("no products ")
            err.status = 400
            return next(err)
        }

        res.status(200).json({
            message: "product fetched successfully",
            product

        })
    } catch (error) {
        next(error)
    }

}

export const deleteProduct = async (req, res, next) => {

    try {


        const product = await Product.findById(req.params.id);
        if (!product) {
            const err = new Error("Product not found")
            err.status = 404
            return next(err)
        }

        if (product.img) {
            const imgPath = "." + product.img;
            fs.unlink(imgPath, (err) => {
                if (err) console.log("img del error", err);

            })
        }
        await product.deleteOne()
        res.status(200).json({
            message: "Product deleted"
        })
    } catch (error) {
        next(error)
    }


}



export const randomProduct = async (req, res, next) => {

    try {
        const products = await Product.aggregate([
            { $sample: { size: 12 } }
        ])

        res.json(products)

    } catch (error) {
        next(error)
    }


}

export const getAllProduct = async (req, res, next) => {

    try {
        const { category } = req.query;
        const filter = {}

        if (category) {
            filter.category = category;
        }
        const products = await Product.find(filter)
        res.json(products)
    } catch (error) {
        next(error)
    }
}