import User from "../model/User.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Unauthorized access - no token provided",
      });
    }

    //beares eyc
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const isAdmin =async (req, res, next)=>{
  if(req.user?.role !== 'admin'){
    return res.status(401).json({
      message: "Access denied, Admin only "
    })
  }
  next();
}

