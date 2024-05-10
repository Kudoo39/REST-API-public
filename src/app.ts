// express
import express, {Request, Response} from "express"

import productsRouter from "./routers/productsRouter";

type Product = {
  id: string
  name: string
  price: number
}

// fake database
let products: Product[] = [
  { id: "1", name: "product1", price: 1 },
  { id: "2", name: "product2", price: 2 },
  { id: "3", name: "product3", price: 3 }
];

const PORT = 8000

// create a server with express
const app = express()
app.use(express.json())

// method
// endpoint
// data
app.get("/", (req: Request, res: Response) => {
  //logic
  //res.status(200).send("Hello World!")
  res.status(200).json("Hello World!")
})

app.use("/api/v1/products", productsRouter);

// app.get("/api/v1/products", (request: Request, response: Response) => {
//   response.status(200).json(products);
//   // response of user and order
//   //  response.status(200).json(users);
//   //  response.status(200).json(order);
// });

// app.post("/api/v1/products", (req: Request, res: Response) => {
//   // req.body allows us to get the data from request
//   const newProduct = req.body;
//   products.push(newProduct);
//   res.status(200).json(products);
// });

// app.delete(
//   "/api/v1/products/:productId",
//   (req: Request, res: Response) => {
//     // logic
//     const productId = req.params.productId;
//     console.log(req.params, "p");
//     products = products.filter((item) => item.id !== productId);
//     // res.status(200).json({ message: "delete successfully" });
//     // res.status(204).end();
//     res.sendStatus(204);
//   }
// );

// users
// orders
// category

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

