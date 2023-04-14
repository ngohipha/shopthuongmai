const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    cart: {
      type: Array,
      default: [],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type:String
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resttoken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resttoken)
    .digest("hex");

  this.passwordResetExpire = Date.now() + 30 * 60 * 1000; // 30 minutes from now

  return resttoken;
};
module.exports = mongoose.model("User", userSchema);
