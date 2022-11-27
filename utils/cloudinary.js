const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "ddfgtepve",
  api_key: "318527871433738",
  api_secret: "q7b551WxbD7y8EtHxRfRt2WXCfQ",
});

const upload = async (file) => {
  const image = await cloudinary.uploader.upload(file, (result) => result);
  return image;
};

// const image = await cloudinary.uploader.upload(
//   file,
//   { folder: "Test" },
//   (result) => result
// );


module.exports = { cloudinary, upload };
// module.exports = ;
