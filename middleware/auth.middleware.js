import jwt from "jsonwebtoken";
import User from "../model/User.js";

// 🔒 Protect routes (verify token + attach user)
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized access - no token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT secret key not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 🔐 Allow only admins
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "Access denied - Admins only",
    });
  }
  next();
};
