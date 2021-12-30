import express from "express";
import path from  "path";
// import WebSocket, {WebSocketServer} from "ws";
import { Server } from "socket.io"
import http from "http";

const app = express();
const __dirname = path.resolve("./src");

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 10000);
  });
});

// const wss = new WebSocketServer({server});

// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anonymous";
//     console.log("Connected !");
//     socket.on("close", () => {
//       console.log("Disconnected from the Browser!");
//     });
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg.toString());

//       switch (message.type) {
//         case "new_message":
//           sockets.forEach(aSocket =>
//             aSocket.send(`${socket.nickname}: ${message.payload.toString()}`)
//           );
//         case "nickname":
//           socket["nickname"] = message.payload.toString();
//           console.log(message.payload.toString())
//       }
//     });
//   });
  
httpServer.listen(3000, handleListen);