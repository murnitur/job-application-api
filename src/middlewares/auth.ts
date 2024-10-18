import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, _: any) => {
    if (err) return res.sendStatus(403);

    //continue as the user is authenticated
    next();
  });
};

export default auth;
