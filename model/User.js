import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    select: false, // exclude password by default
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

// 🔒 Hash password before saving (only if modified or new)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip rehashing if password not changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
