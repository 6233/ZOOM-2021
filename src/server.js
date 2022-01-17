import express from "express";
import path from  "path";
// import WebSocket, {WebSocketServer} from "ws";
// import { Server } from "socket.io"
// import { instrument } from "@socket.io/admin-ui"
import http from "http";
import {Server, Socket} from "socket.io"

const app = express();
const __dirname = path.resolve("./src");

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer)
  
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);