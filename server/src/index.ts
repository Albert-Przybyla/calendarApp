import { config } from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

import swaggerDocs from "./utils/swagger";

config({ path: `${__dirname}/.env` });

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

swaggerDocs(app);
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.CONNECTION_STRING);
mongoose.connection.on("error", (err: Error) => {
  console.log("err: ", err);
});

app.use("/", router());
