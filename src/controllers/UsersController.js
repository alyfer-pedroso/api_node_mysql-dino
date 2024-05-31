const UsersService = require("../services/UsersService");
const { Sucessful, Error } = require("../classes");
const { encrypt } = require("../functions/crypt");

module.exports = {
  searchAll: async (_req, resp) => {
    try {
      const users = await UsersService.searchAll();
      resp.json(new Sucessful(users));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  verifyLogin: async (req, resp) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) return resp.json(new Error("Preencha todos os campos!", "Login inválido"));

      const user = await UsersService.findByEmail(email);
      if (user.length > 0) {
        const result = await UsersService.verifyLogin(email, encrypt(password, user[0]?.iv).data);
        let user = result[0];
        delete user?.password;
        delete user?.iv;
        if (result.length > 0) return resp.json(new Sucessful({ ...user }, "Login efetuado com sucesso!"));
      }

      resp.json(new Error("Email ou Senha incorretos!", "Login inválido!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  register: async (req, resp) => {
    const { email, user, password } = req.body;
    try {
      if (!email || !user || !password) return resp.json(new Error("Preencha todos os campos!", "Registro inválido"));

      const verifyIfExist = await UsersService.findByEmail(email);
      if (verifyIfExist.length > 0) return resp.json(new Error("Esse email já está sendo usado.", "Registro inválido!"));

      const encrypted = encrypt(password);
      await UsersService.register(email, user, encrypted.data, encrypted.iv);
      resp.json(new Sucessful(req.body, "Usuário cadastrado com sucesso!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  deleteUser: async (req, resp) => {
    const { id } = req.params;
    try {
      if (!id) return resp.json(new Error("Preencha todos os campos!", "Delete inválido"));

      const exist = await UsersService.findByID(id);
      if (exist.length < 1) return resp.json(new Error(`Não foi possível encontrar o ID: ${id}`, "Delete inválido"));

      await UsersService.deleteUser(id);
      resp.json(new Sucessful({ id }, "Usuário deletado com sucesso!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  changePassword: async (req, resp) => {
    const { id, password } = req.body;
    try {
      if (!id || !password) return resp.json(new Error("Preencha todos os campos!", "Alteração inválida"));

      const exist = await UsersService.findByID(id);
      if (exist.length < 1) return resp.json(new Error(`Não foi possível encontrar o ID: ${id}`, "Alteração inválida"));

      const encrypted = encrypt(password);
      await UsersService.changePassword(encrypted.data, encrypted.iv, id);
      resp.json(new Sucessful({ id, password }, "Senha atualizada com sucesso!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  setOnline: async (req, resp) => {
    const { online, id } = req.body;
    try {
      if (!id || online === null) return resp.json(new Error("Preencha todos os campos!", "Alteração inválida"));

      const exist = await UsersService.findByID(id);
      if (exist.length < 1) return resp.json(new Error(`Não foi possível encontrar o ID: ${id}`, "Alteração inválida"));

      await UsersService.setOnline(online, id);
      resp.json(new Sucessful({ id, online }, "Alteração feita com sucesso!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },
};
