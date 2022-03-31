const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/usersModels");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const createUser = asyncHandler(async (req, res) => {
  const { name, lastName, email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Necesito un email");
  }

  if (!password) {
    res.status(400);
    throw new Error("Necesito un password");
  }

  if (!name) {
    res.status(400);
    throw new Error("Necesito un nombre");
  }

  if (!lastName) {
    res.status(400);
    throw new Error("Necesito un apellido");
  }

  // Reviso si existe un usuario con el mismo email.
  const userExist = await users.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email ya registrado");
  }

  // Encrypto el password;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await users.create({
    name,
    lastName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Datos no validos");
  }
});

const readUser = asyncHandler(async (req, res) => {});

const updateUser = asyncHandler(async (req, res) => {});

const deleteUser = asyncHandler(async (req, res) => {});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Falta email");
  }

  if (!password) {
    res.status(400);
    throw new Error("Faltan contraseña");
  }

  // Busco al usuario
  const user = await users.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Usuario no existe");
  }

  // reviso el password
  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Credenciales invalidas");
  }
});

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  login,
};
