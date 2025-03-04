const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Nome é obrigatório").not().isEmpty(),
    check("email", "E-mail inválido").isEmail(),
    check("password", "Senha deve ter pelo menos 6 caracteres").isLength({ min: 6 }),
  ],
  authController.register
);

router.post("/login", authController.login);

module.exports = router;
