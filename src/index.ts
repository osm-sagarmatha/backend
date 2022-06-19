import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import compression from "compression";

import routes from "~/routes";
import { handleError } from "~/middlewares";
import { socketio, connectToDb } from "~/utils";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        [key: string]: any;
      };
    }
  }
}

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(compression());
app.use(morgan("dev"));

app.use("/api", routes);

app.use(handleError);

const main = async () => {
  await connectToDb();

  const io = socketio.init(server);

  io.on("connection", async (socket) => {
    if (!socket.data.userId) return;
    socket.join(socket.data.userId);
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

main().catch((e) => {
  console.log(e);
});
