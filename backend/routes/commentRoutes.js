const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Criar um novo comentário
router.post("/", commentController.createComment);

// Listar todos os comentários
router.get("/", commentController.getAllComments);

// Buscar comentário por ID
router.get("/:id", commentController.getCommentById);

// Atualizar comentário por ID
router.put("/:id", commentController.updateComment);

// Deletar comentário por ID
router.delete("/:id", commentController.deleteComment);

module.exports = router;
