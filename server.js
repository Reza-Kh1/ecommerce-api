import http from "http";
import app from "./app/app.js";
const Port = process.env.PORT || 5000
const server = http.createServer(app);

server.listen( Port, () => {
  console.log(`server run in port ${Port}`);
});
