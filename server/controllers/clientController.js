import Client from '../Models//clientModel.js';
import jwt, { decode } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { refreshToken } from './adminController.js';


export const regClient = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body

        const existUser = await Client.findOne({
            $or: [{ userName }, { email }]
        })
        if (existUser) {

            if (existUser.userName === userName) {
                const err = new Error("User name already taken")
                err.status = 400;
                return next(err)
            }
            if (existUser.email === email) {
                const err = new Error("User email already taken")
                err.status = 400;
                return next(err)
            }
        }

        const hashpwd = await bcrypt.hash(password, 10)

        const user = Client.create({
            userName,
            email,
            password: hashpwd
        })

        res.status(200).json({
            message: "regiter successfull",

        })

    } catch (error) {
        next(error)
    }
}




export const loginClient = async (req, res, next) => {
    try {

        const { email, password } = req.body

        const user = await Client.findOne({ email })

        if (!user) {
            const err = new Error("user not found")
            err.status = 400;
            return next(err)
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            const err = new Error("password dose not match")
            err.status = 401;
            return next(err)
        }

        const accessToken = jwt.sign(
            { id: user._id, role: "client" },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "15m" }
        )
        const refreshToken = jwt.sign(
            { id: user._id, role: "client" },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "7d" }
        )

        res.status(200).json({
            message: "login successfull",
            accessToken,
            refreshToken,
            userDetail: {
                id: user._id,
                user: user.userName
            }
        })

    } catch (error) {
        next(error)
    }
}


export const clientRefreshToken = async (req, res, next) => {

    try {
        const { token } = req.body;
        if (!token) {
            const err = new Error("no token provided")
            err.status = 400
            return next(err)
        }

        jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, decode) => {


            if (err) {
                const err = new Error("Invalid token");
                err.status = 403
                return next(err)
            }

            const accessToken = jwt.sign(
                { id: decode.id, role: decode.role },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "15m" }
            )

            res.json({
                accessToken

            })
        })



    } catch (error) {
        next(error)
    }

}


export const getClient = async (req, res, next) => {
    try {
        const client = await Client.find()
        res.json(client)
    } catch (error) {

    }
}