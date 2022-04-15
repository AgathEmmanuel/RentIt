import express from "express";

const router = express.Router();

router.get("/api/user/currentuser", (req,res) => {
    res.send("current user endpoint !!!")
});

export { router as currentUserRouter };
