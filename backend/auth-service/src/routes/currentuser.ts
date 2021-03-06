import express from "express";
// import jwt from "jsonwebtoken";
//import { loggedoffUserHandler } from "../middleware/loggedoff-user-handler";
//import { currentUserHandler } from "../middleware/current-user-handler";
import { loggedoffUserHandler } from "@rentit/shared-custom-package";
import { currentUserHandler } from "@rentit/shared-custom-package";

const router = express.Router();

router.get("/api/user/currentuser", currentUserHandler, (req,res) => {
/*
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
*/
    // making use of the currentUserHandler middleware for the
    // above logic

    //res.send({ currentUser: req.currentUser || null });
    let currentUser;
    if (req.currentUser)
    {
        currentUser = req.currentUser;
    }
    else
    {
        currentUser = null;
    }
    res.send({ currentUser: currentUser });
    // sending null instead of undefined

});

export { router as currentUserRouter };
