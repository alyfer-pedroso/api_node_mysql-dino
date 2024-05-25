const { Sucessful, Error } = require("../classes");
const UsersService = require("../services/UsersService");

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
      if (email && password) {
        const result = await UsersService.verifyLogin(email, password);
        result.length > 0
          ? resp.json(new Sucessful({ email: result[0].email, password: result[0].password }, "Login efetuado com sucesso!"))
          : resp.json(new Error("Email ou Senha incorretos!", "Login inválido!"));
      }
      if (!email || !password) resp.json(new Error("Preencha todos os campos!", "Login inválido"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  register: async (req, resp) => {
    const { email, user, password } = req.body;
    try {
      if (email && user && password) {
        const verifyIfExist = await UsersService.verifyEmail(email);
        if (verifyIfExist.length > 0) return resp.json(new Error("Esse email já está sendo usado.", "Registro inválido!"));
        const register = await UsersService.register(email, user, password);
        resp.json(new Sucessful({ ...register, registration_date: new Date() }, "Usuário cadastrado com sucesso!"));
      }

      if (!email || !user || !password) resp.json(new Error("Preencha todos os campos!", "Registro inválido"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  deleteUser: async (req, resp) => {
    let json = { status: "", data: {} };
    await UsersService.deleteUser(req.params.id);
    resp.json(json);
  },

  changePassword: async (req, resp) => {
    let json = { status: "", data: {} };
    let password = req.body.password;
    let id = req.body.id;

    if (password && id) {
      const exist = await UsersService.verifyID(id);
      if (exist.length < 1) {
        json.status = `Não foi possível encontrar o ID: ${id}`;
        return resp.json(json);
      }

      await UsersService.changePassword(password, id);
      json.status = "Senha atualizada com sucesso!";
      json.data = { id, password };
    } else {
      json.status = "A alteração não pode ser efetuada.";
    }

    if (!id || !password) {
      json.status = "Preencha todos os campos!";
    }

    resp.json(json);
  },

  setOnline: async (req, resp) => {
    let json = { status: "", data: {} };
    let online = req.body.online;
    let id = req.body.id;

    if (online && id) {
      const exist = await UsersService.verifyID(id);
      if (exist.length < 1) {
        json.status = `Não foi possível encontrar o ID: ${id}`;
        return resp.json(json);
      }

      await UsersService.setOnline(online, id);
      json.status = "A alteração foi efetuada com sucesso!";
      json.data = { id, online };
    } else {
      json.status = "A alteração não pode ser efetuada.";
    }

    if (!id || !online) {
      json.status = "Preencha todos os campos!";
    }

    resp.json(json);
  },
};
