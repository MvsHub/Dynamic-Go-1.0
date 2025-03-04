const Post = require("../models/Post");
const User = require("../models/User"); // Importação necessária para validar o autor

// Criar um novo post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    // Verificar se o usuário existe
    const userExists = await User.findById(author);
    if (!userExists) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const post = new Post({
      title,
      content,
      author,
    });

    await post.save();
    res.status(201).json({ message: "Post criado com sucesso!", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os posts com os dados do autor
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar post por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");
    if (!post) return res.status(404).json({ message: "Post não encontrado" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar post
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post não encontrado" });

    // Garante que o autor não seja modificado na atualização
    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json({ message: "Post atualizado com sucesso!", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post não encontrado" });
    res.json({ message: "Post deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

