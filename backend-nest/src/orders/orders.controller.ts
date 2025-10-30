import { Controller, Get, Req, HttpException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Controller()
export class OrdersController {
  @Get("protected")
  async getProtected(@Req() req) {
    try {
      const authHeader = req.headers["authorization"] || "";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.jwt;

      if (!token) throw new HttpException("No token provided", 401);

      const secret =
        process.env.JWT_SECRET ||
        "9b1c1a5f2d7e4a9b3c6d2f0e7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6789";
      const decoded: any = jwt.verify(token, secret);

      return {
        message: "This is protected data from backend",
        user: { id: decoded.sub, email: decoded.email },
        orders: [
          { id: 1, item: "Product A", price: 100 },
          { id: 2, item: "Product B", price: 50 },
        ],
      };
    } catch (err: any) {
      throw new HttpException("Unauthorized: " + err.message, 401);
    }
  }
}
