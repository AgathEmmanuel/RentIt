import express from "express";

const router = express.Router();

router.post("/api/user/signin", (req,res) => {
    res.send("sign in endpoint, ha ha")
});
export { router as signInRouter };
