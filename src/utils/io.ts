import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

import jwt from "~/utils/jwt";

let io: Server;

export default {
  init(server: HttpServer) {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.use((socket, next) => {
      try {
        const decoded = jwt.verify(socket.handshake.auth.token);
        socket.data.userId = decoded.id;
      } catch (e) {}

      next();
    });

    return io;
  },
  getIo() {
    return io;
  },
};
