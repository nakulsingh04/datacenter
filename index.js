import express from "express";
import routes from "./routes/index.js";
import { connectDB } from "./dbConfig/dnConfig.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
