import Admin from "../Models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const AdminReg = async (req, res, next) => {

    try {

        const { userName, password } = req.body

        const checkUser = await Admin.findOne()

        if (checkUser) {
            const err = new Error("Connot Add Admin")
            err.status = 400
            return next(err)
        }

        const hashedpwd = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
            userName,
            password: hashedpwd
        })

        res.status(201).json({
            message: "Admin Created Successfully",
            admin
        })

    } catch (error) {
        next(error)
    }


}


export const AdminLogin = async (req, res, next) => {
    try {

        const { userName, password } = req.body;

        const user = await Admin.findOne({ userName })

        if (!user) {
            const err = new Error("User Not Found")
            err.status = 401
            return next(err)
        }
        const isMatch = await bcrypt.compare(password, user.password)


        if (!isMatch) {
            const err = new Error("Invalid Credentials")
            err.status = 401
            return next(err)
        }

        const accessToken = jwt.sign(
            { id: user._id, role: "admin" },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "15m" }

        )
        const refreshToken = jwt.sign(
            { id: user._id, role: "admin" },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "7d" }
        )
        res.status(200).json({
            message: "Login successfully",
            accessToken,
            refreshToken
        })


    } catch (error) {
        next(error)
    }
}

export const refreshToken = (req, res, next) => {

    const { token } = req.body;

    if (!token) {
        const err = new Error("no token provided")
        err.status = 401;
        return next(err);
    }

    jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, decoded) => {

        if (err) {
            const err = new Error("Invalid token");
            err.status = 403;
            return next(err)
        }


        const accessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "15m" }
        )
        res.json({ accessToken })
    })
}

