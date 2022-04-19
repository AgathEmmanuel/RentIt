import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/user/currentuser", (req,res) => {
    //if (!req.session || !req.session.jwt) {
    //the same logic can be written as req.session?.jwt
    if (!req.session?.jwt) {
        return res.send({ currentUser: null });
    }
    try {
        const jwtUserDetails = jwt.verify( req.session.jwt, process.env.JWT_SECRET_KEY!)
        res.send({currentUser: jwtUserDetails});
    } catch (err) {
        res.send({currentUser: null });
    }
});

export { router as currentUserRouter };
