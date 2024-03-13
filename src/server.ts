import http, { IncomingMessage, Server, ServerResponse } from "http";

// fake users database
type User = {
  id: string;
  password: string;
  email: string;
  fullname: string;
  role: string;
  avatar: string;
};
let users: User[] = [
  {
    id: "1",
    password: "123456",
    email: "user1@example.com",
    fullname: "User 1",
    role: "user",
    avatar: "https://example.com/avatar1.png",
  },
  {
    id: "2",
    password: "234567",
    email: "user2@example.com",
    fullname: "User 2",
    role: "admin",
    avatar: "https://example.com/avatar2.png",
  },
];

const PORT = 8000;
const server: Server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    // Get /users/{userId}
    // endpoint: https://api.escuelajs.co/api/v1/users/{userId}

    if (
      request.method === "GET" &&
      request.url &&
      request.url.startsWith("/api/v1/users")
    ) {
      const userId = request.url.split("/")[4];
      const result = users.find((user) => user.id === userId);
      if (!result) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "User not found" }));
        return;
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(result));
    }

    // Post /users
    // endpoint: https://api.escuelajs.co/api/v1/users/

    if (request.method === "POST" && request.url === "/api/v1/users") {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(newUser));
      });
    }
  }
);

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
