import express from "express"
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./dbConfig/dnConfig.js";
// import routes from "./routes";
const app = express();
app.use(express.json());
app.use("/user",userRouter)

// app.get('/api/greet', (req, res) => {
//     let query=  req.query
//     let body=  req.body
//     console.log(query,body,"hhhhh")
//     res.json({ message: 'Hello, World!' });
//   });

//   app.post('/api/greet', (req, res) => {
//     let query=  req.query
//     let body=  req.body
//     console.log(query,body,"hhhhh")
//     res.json({ message: 'Hello, World!' });
//   });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB()
});