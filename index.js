require("dotenv").config();
require("express-async-errors");
const express = require("express");
const createHttpError = require("http-errors");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbCon");
const morgan = require("morgan");
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/", require("./routes/root"));
app.use("/api/auth", require("./routes/authRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(async (req, res, next) => {
  const error = new Error("Not Found!!!");
  error.status = 404;
  next(error);
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
