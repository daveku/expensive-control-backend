const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../v1/models/usersModels");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // obtengo el token del headers enviado en el required
      token = req.headers.authorization.split(" ")[1];

      // verificamos la firma.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtenemos la información del usuario
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(400);
      throw new Error("ACCESO NO AUTORIZADO");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("ACCESO NO AUTORIZADO, necesitas un token.");
  }
});

module.exports = {
  protect,
};
