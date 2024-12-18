import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// App routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  res.send(
    `<div style="background: black; border-radius: 15px; width: 700px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: center;"><h1 style="color: white; text-align: center;">Welcome to the server of Blog!</h1></div>`,
  );
};

app.get("/", test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
