const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require('cookie-parser')
const productRouter = require('./routes/productRoute')
const morgan = require('morgan')
const blogRouter = require("./routes/blogRoute")
const categoryRouter =require('./routes/categoryRoute')
const blogCategoryRouter =require('./routes/blogcategoryRoute')
const brandRouter =require('./routes/brandRoute')


dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use("/api/user", authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/category",categoryRouter);
app.use("/api/blogcategory",blogCategoryRouter);
app.use("/api/brand",brandRouter);



app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
