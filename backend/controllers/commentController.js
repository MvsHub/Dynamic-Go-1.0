const Comment = require("../models/Comment");
const User = require("../models/User");
const Post = require("../models/Post");

// Criar um novo comentário
exports.createComment = async (req, res) => {
  try {
    console.log("Recebido no body:", req.body);

    const { content, user, post } = req.body;

    if (!content || !user || !post) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    // Verificar se o usuário existe
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verificar se o post existe
    const postExists = await Post.findById(post);
    if (!postExists) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    const comment = new Comment({ content, user, post });
    await comment.save();

    res.status(201).json({ message: "Comentário criado com sucesso!", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os comentários
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("post", "title")
      .populate("user", "name email");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar comentário por ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("post", "title")
      .populate("user", "name email");

    if (!comment) return res.status(404).json({ message: "Comentário não encontrado" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar comentário
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comentário não encontrado" });

    comment.content = req.body.content || comment.content;

    await comment.save();
    res.json({ message: "Comentário atualizado!", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar comentário
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comentário não encontrado" });
    res.json({ message: "Comentário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
