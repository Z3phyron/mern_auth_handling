const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((res, rej) => {
      const payload = {
        userId,
      };
      const secret = process.env.JWT_ACCESS_SECRET;
      const options = {
        expiresIn: "1d",
        issuer: "websiteDomain.com",
        audience: userId.toString(),
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) rej(createHttpError.InternalServerError());
        res(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return next(createHttpError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const BearerToken = authHeader.split(" ");
    const token = BearerToken[1];
    // console.log(token)

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
      // console.log(err);
      //   if (err.name === "JsonWebTokenError") {
      //     return next(createHttpError.Unauthorized());
      //   } else {
      //     return next(createHttpError.Unauthorized(err.message));
      //   }

      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return res.status(401).json(message);
      }

      // return next(createHttpError.Unauthorized(message));
      // console.log(payload)
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((res, rej) => {
      const payload = {
        userId,
      };
      const secret = process.env.JWT_REFRESH_SECRET;
      const options = {
        expiresIn: "1d",
        issuer: "websiteDomain.com",
        audience: userId.toString(),
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) rej(createHttpError.InternalServerError());
        res(token);
      });
    });
  },
  emailToken: (userId) => {
    return new Promise((res, rej) => {
      const payload = {
        userId,
      };
      const secret = process.env.JWT_REFRESH_SECRET;
      const options = {
        expiresIn: "1d",
        issuer: "websiteDomain.com",
        audience: userId.toString(),
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) rej(createHttpError.InternalServerError());
        res(token);
      });
    });
  },
  verifyEmailToken: (emailToken) => {
   return new Promise((res, rej) => {
     jwt.verify(
       emailToken,
       process.env.JWT_REFRESH_SECRET,
       (err, payload) => {
         if (err) return rej(createHttpError.Unauthorized());
         const userId = payload.aud;
         res(userId);
       }
     );
   });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((res, rej) => {
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, payload) => {
          if (err) return rej(createHttpError.Unauthorized());
          const userId = payload.aud;
          res(userId);
        }
      );
    });
  },
};
