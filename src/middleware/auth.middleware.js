import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {

        const token = req.headers["access-token"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.params = { id: decoded.id };
        next();
    } catch (e) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
}

export const authPostMiddleware = (req, res, next) => {
    try {
        const token = req.body.headers["access-token"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId =  decoded.id;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
}