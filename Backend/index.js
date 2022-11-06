const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UserRoutes = require("./Routes/routes")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=> res.send("Registration Application"));

app.use("/user",UserRoutes)

mongoose.connect("mongodb+srv://registration1272:registration1272@registration12.bf57tn3.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB CONNECTED SUCCESSFULLY")
})
  .catch((err) => {
    console.log(err.message)
})
const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`Server Started on Port ${PORT}`)
})