import express from "express"

const app = express()

app.get("/", (req, res, next) => {
    res.status(200).json({message: "Starting!!"})
})


app.listen(3012, () => {
    console.log("Listen on port 3012...")
})