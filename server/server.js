import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
});
