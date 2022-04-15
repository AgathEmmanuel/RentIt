import express from "express";

const router = express.Router();

router.post("/api/user/signout", (req,res) => {
    res.send("sign out endpoint")
});

export { router as signOutRouter };
