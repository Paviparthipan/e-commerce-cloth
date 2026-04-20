
import Order from "../Models/orderModel.js";

export const createOrder = async (req, res, next) => {

    try {


        const { items, totalAmount, address } = req.body;
        const userId = req.user.id

        const orderNum = "#ORD-" + Math.random().toString(36).substring(2, 8)


        const order = new Order({
            userId,
            orderNumber: orderNum,
            items,
            totalAmount,
            address
        });
        await order.save()
        res.status(201).json({
            message: "order placed successfully",
            order
        })
    } catch (error) {
        next(error)
    }
}

export const getMyOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;



        const order = await Order.find({ userId }).sort({ createdAt: -1 })
        res.json(order)
    } catch (error) {
        next(error)


    }
}


export const getOrder = async (req, res, next) => {
    try {
        const filter = {}
        if (req.query.status) {
            filter.status = req.query.status
        }
        const order = await Order.find(filter).sort({ createdAt: -1 })
        res.json(order)
    } catch (error) {
        next(error)
    }
}

export const actionOrder = async (req, res, next) => {
    try {
        const { id, action } = req.body
        let updatedOrder

        if (action === "accept") {
            updatedOrder = await Order.findByIdAndUpdate(id, { status: "shipping" }, { returnDocument: "after" })
        } else if (action === "reject") {
            updatedOrder = await Order.findByIdAndUpdate(id, { status: "rejected" }, { returnDocument: "after" })
        } else if (action === "delivered") {
            updatedOrder = await Order.findByIdAndUpdate(id, { status: "delivered" }, { returnDocument: "after" })
        } else {
            return res.status(400).json({ message: "Invalid action" })
        }

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" })
        }

        res.status(200).json({ message: `Order ${action} successfully`, order: updatedOrder })
    } catch (error) {
        next(error)
    }
}