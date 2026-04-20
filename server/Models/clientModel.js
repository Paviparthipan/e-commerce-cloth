import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Client = mongoose.model("Client", clientSchema)

export default Client;