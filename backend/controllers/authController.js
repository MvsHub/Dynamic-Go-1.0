const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  console.log("Recebendo requisição de registro:", req.body);

  // Validação de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Erros na validação dos dados:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  // Garantir que os campos obrigatórios foram preenchidos
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
  }

  try {
    // Verifica se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    // Hash na senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || "user" // Define um valor padrão para role caso não seja passado
    });

    await user.save();

    // Verifica se existe JWT_SECRET definido
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido no .env");
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1h" }
    );

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: error.message || "Erro no servidor." });
  }
};

exports.login = async (req, res) => {
  console.log("Tentativa de login:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    // Busca o usuário pelo email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    // Compara a senha informada com o hash no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    // Verifica se existe JWT_SECRET definido
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido no .env");
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1h" }
    );

    res.status(200).json({
      message: "Login bem-sucedido!",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: error.message || "Erro no servidor." });
  }
};
