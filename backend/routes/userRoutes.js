const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); 
const authController = require("../controllers/authController"); 
const auth = require("../middleware/auth");

// Registro de Usuário
router.post("/register", authController.register);

// Login de Usuário
router.post("/login", authController.login);

// Rota protegida para obter o perfil do usuário autenticado
router.get("/perfil", auth, userController.getUserProfile);

// Operações CRUD de Usuários
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
