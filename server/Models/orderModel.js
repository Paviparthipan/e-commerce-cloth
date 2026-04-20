import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },

    orderNumber: {
        type: String,
        unique: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            price: Number,
            size: String,
            qty: Number,
            img: String

        }
    ],
    totalAmount: Number,

    address: {
        cusName: String,
        cusNumber: Number,
        cusAddress: String
    },

    status: {
        type: String,
        default: "pending"
    }


}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema)

export default Order