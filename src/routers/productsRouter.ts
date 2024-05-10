// product router
import express, { Request, Response } from "express"

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
]

const router = express.Router()

// GET PRODUCTS
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(products)
})

// CREATE A PRODUCT
router.post("/", (req: Request, res: Response) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(200).json(products);
})

router.delete("/:productId", (req: Request, res: Response) => {
  const productId = req.params.productId;
  products = products.filter((item) => item.id !== productId);
  res.sendStatus(204);
})

// query
// same method, same endpoint -> order?!
// search feature
router.get("/", (req: Request, res: Response) => {
  // query
  const nameQuery = req.query.name as string;
  console.log(req.query, "query");
  const priceQuery = req.query.price as string;

  products = products.filter((product) =>
    product.name.toLowerCase().includes(nameQuery.toLowerCase())
  );
  res.status(200).json(products);
});

export default router;