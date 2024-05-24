const UsersService = require("../services/UsersService");

module.exports = {
  searchAll: async (_req, resp) => {
    let json = { status: "", data: [] };
    const users = await UsersService.searchAll();
    for (let i in users) {
      json.data.push({
        id: users[i].id,
        user: users[i].user,
        password: users[i].password,
        online: users[i].online,
      });
    }
    resp.json(json);
  },

  verifyLogin: async (req, resp) => {
    let json = { status: "", data: {} };
    let user = req.body.user;
    let password = req.body.password;

    if (user && password) {
      const result = await UsersService.verifyLogin(user, password);
      result.length > 0
        ? (json = { status: "Login efetuado com sucesso!", data: { user: result[0].user, password: result[0].password } })
        : (json.status = "Login inválido!");
    } else {
      json.status = "O Login não pode ser efetuado";
    }

    if (!user || !password) {
      json.status = "Preencha todos os campos!";
    }
    resp.json(json);
  },

  register: async (req, resp) => {
    let json = { status: "", data: {} };
    let user = req.body.user;
    let password = req.body.password;

    if (user && password) {
      const verifyIfExist = await UsersService.verifyLogin(user, password);
      if (verifyIfExist.length > 0) {
        json.status = "Usuário ja existente";
        return resp.json(json);
      }
      const registerID = await UsersService.register(user, password);
      json.status = "Usuário cadastrado com sucesso!";
      json.data = { id: registerID, user, password };
    } else {
      json.status = "Novo usuário não pode ser criado";
    }

    if (!user || !password) {
      json.status = "Preencha todos os campos!";
    }

    resp.json(json);
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
