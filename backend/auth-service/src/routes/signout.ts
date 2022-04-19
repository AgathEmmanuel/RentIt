import express from "express";

const router = express.Router();

router.post("/api/user/signout", (req,res) => {
    req.session = null;
    res.send("sign out endpoint")
});

export { router as signOutRouter };
