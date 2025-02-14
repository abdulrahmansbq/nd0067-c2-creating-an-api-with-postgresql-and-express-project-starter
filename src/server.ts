import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pr from "./handlers/products";
import ur from "./handlers/users";
import or from "./handlers/orders";

const app: express.Application = express();
const address: string = "localhost:3000";

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus:  200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());


pr.product_routes(app);
ur.user_routes(app);
or.order_routes(app);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;