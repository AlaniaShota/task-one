const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const myMiddleware = require("./middleware.js");

server.use(middlewares);
server.use(myMiddleware);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running on port 5000");
});
