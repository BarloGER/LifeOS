import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectToDB } from "./db/index.js";
import { authRouter } from "./routes/authRouter.js";

const app = express();
const PORT = 8080 || process.env.PORT;
connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true to get rid of body-parser error

app.use("/auth", authRouter);
app.use("*", (req, res) => res.sendStatus(404));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
