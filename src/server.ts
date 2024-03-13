import http, { IncomingMessage, Server, ServerResponse } from "http";

// fake products database
type Product = {
  id: string
  title: string
  price: number
  description: string
  size: number
  images: string
  categoryId: string
}
let products: Product[] = [
  {
    id: '1',
    title: 'product1',
    price: 1,
    description: 'Description for product 1',
    size: 10,
    images: 'product1.jpg',
    categoryId: 'category1'
  },
  {
    id: '2',
    title: 'product2',
    price: 2,
    description: 'Description for product 2',
    size: 20,
    images: 'product2.jpg',
    categoryId: 'category2'
  },
  {
    id: '3',
    title: 'product3',
    price: 3,
    description: 'Description for product 3',
    size: 30,
    images: 'product3.jpg',
    categoryId: 'category3'
  }
]
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
    // Get /products
    // endpoint: http://localhost:8000/api/v1/products

    if (request.method === "GET" && request.url === "/api/v1/products") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(products));
    }

    // Get /products/{productId}
    // endpoint: http://localhost:8000/api/v1/products/{productId}

    if (request.method === "GET" && request.url && request.url.startsWith("/api/v1/products/")) {
      const productId = request.url.split("/")[4];
      const result = products.find((product) => product.id === productId);
      if (!result) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Product not found" }));
        return;
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(result));
    }

    // Post /products
    // endpoint: http://localhost:8000/api/v1/products
    
    if (request.method === "POST" && request.url === "/api/v1/products") {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        const newProduct = JSON.parse(body);
        products.push(newProduct);
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(newProduct));
      });
    }

    // Delete /products/{productId}
    // endpoint: http://localhost:8000/api/v1/products/{productId}

    if (request.method === "DELETE" && request.url &&request.url.startsWith("/api/v1/products")) {
      const productId = request.url.split("/")[4];
      console.log(productId, "id");
      products = products.filter((product) => product.id !== productId);
      response.writeHead(204, { "Content-Type": "application/json" });
      response.end();
    }

    // Put /products/{productId}
    // endpoint: http://localhost:8000/api/v1/products/{productId}

    if (request.method === "PUT" && request.url && request.url.startsWith("/api/v1/products")) {
      const productId = request.url.split("/")[4];
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        const updateData = JSON.parse(body);
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex !== -1) {
          products[productIndex] = { ...products[productIndex], ...updateData };
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify(products[productIndex]));
        } else {
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Product not found" }));
        }
      });
    }

//-----------------------------------------------------------------------------------//
    // Get /users/{userId}
    // endpoint: http://localhost:8000/api/v1/users/{userId}

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
    // endpoint: http://localhost:8000/api/v1/users

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

    //-----------------------------------------------------------------------------------//
    // Put /users/{userId}
    // endpoint: http://localhost:8000/api/v1/users/{userId}
    if (
        request.method === "PUT" &&
        request.url &&
        request.url.startsWith("/api/v1/users")
      ) {
        const userId = request.url.split("/")[4];
        let body = "";
        request.on("data", (chunk) => {
          body += chunk;
        });
        request.on("end", () => {
          const updatedUser = JSON.parse(body);
          const index = users.findIndex((user) => user.id === userId);
          if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser }
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(users[index]));
          } else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "User not found" }));
          }
        });
      }
  }
);

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
