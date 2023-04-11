const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("data connected successfully");
  } catch (error) {
    console.log("data error");
  }
};

module.exports = dbConnect;
