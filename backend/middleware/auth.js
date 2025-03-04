const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Obtém o token do cabeçalho Authorization
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  // Remove a palavra 'Bearer ' do token antes de verificar
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona o usuário decodificado ao request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
