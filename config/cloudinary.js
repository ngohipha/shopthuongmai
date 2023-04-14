const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      fileToUploads,
      {
        folder: "shopdienthu/products", // Specify the desired folder path here
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          // Handle error
          console.error("Error uploading file to Cloudinary:", error);
          resolve(null); // Return null or an appropriate error response
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};
const cloudinaryUploadImgBlog = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      fileToUploads,
      {
        folder: "shopdienthu/blogs", // Specify the desired folder path here
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          // Handle error
          console.error("Error uploading file to Cloudinary:", error);
          resolve(null); // Return null or an appropriate error response
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg ,cloudinaryUploadImgBlog };