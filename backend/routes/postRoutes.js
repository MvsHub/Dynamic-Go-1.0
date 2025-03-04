const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Criar um post
router.post("/", postController.createPost);

// Listar todos os posts
router.get("/", postController.getAllPosts);

// Buscar post por ID
router.get("/:id", postController.getPostById);

// Atualizar post (IMPORTANTE: ID como parâmetro)
router.put("/:id", postController.updatePost);

// Deletar post (IMPORTANTE: ID como parâmetro)
router.delete("/:id", postController.deletePost);

module.exports = router;
