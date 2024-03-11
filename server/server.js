import express from "express";
import cors from "cors";
import { connectToDB } from "./db/index.js";

const app = express();
const PORT = 8080 || process.env.PORT;
connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true to get rid of body-parser error

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
