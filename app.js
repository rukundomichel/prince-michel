import express from "express";
import cors from "cors";
import routes from "./routes/main.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use((res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
