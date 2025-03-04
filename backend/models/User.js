const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true }, // ID sequencial
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["professor", "aluno", "user"], required: true }, // ADICIONEI "user" AQUI
    avatar: { type: String, default: "" }, // URL da foto do perfil
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

// Middleware para gerar IDs sequenciais de forma segura
UserSchema.pre("save", async function (next) {
  if (!this.userId) {
    try {
      const lastUser = await this.constructor.findOne().sort({ userId: -1 });
      this.userId = lastUser ? lastUser.userId + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
