import express from "express";
import path from  "path";
import WebSocket, {WebSocketServer} from "ws";
import http from "http";

const app = express();
const __dirname = path.resolve("./src");

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({server});

wss.on("connection", (socket) => {
    console.log("Connected to Browser!");
    socket.on("close", () => {
        console.log("Disconnected from the Browser!");
    });
    socket.on("msg", (msg) => {
        console.log(msg)
    });
    socket.send("hello!!");
});

server.listen(3000, handleListen);