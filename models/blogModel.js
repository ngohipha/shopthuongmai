const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1338011657/photo/the-word-blog-arranged-from-wooden-blocks-placed-on-a-white-computer-keyboard.jpg?b=1&s=170667a&w=0&k=20&c=MC6h9IhzFiWTFDOgeD1hsQQM5OJId6SWwVO8K7Fup-8=",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
  
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
