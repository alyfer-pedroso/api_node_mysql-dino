const UsersServices = require("../services/UsersServices");

module.exports = {
  searchAll: async (req, resp) => {
    let json = { status: "", data: [] };
    const users = await UsersServices.searchAll();
    for (let i in users) {
      json.data.push({
        id: users[i].id,
        user: users[i].user,
        password: users[i].password,
      });
    }
    resp.json(json);
  },

  verifyLogin: async (req, resp) => {
    let json = { status: "", data: {} };
    let user = req.body.user;
    let password = req.body.password;

    if (user && password) {
      const result = await UsersServices.verifyLogin(user, password);
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
      const verifyIfExist = await UsersServices.verifyLogin(user, password);
      if (verifyIfExist.length > 0) {
        json.status = "Usuário ja existente";
        return resp.json(json);
      }
      const registerID = await UsersServices.register(user, password);
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

  changePassword: async (req, resp) => {
    let json = { status: "", data: {} };
    let password = req.body.password;
    let id = req.body.id;

    if (password && id) {
      const verifyIfExist = await UsersServices.verifyID(id);
      if (verifyIfExist.length < 1) {
        json.status = `Não foi possível encontrar o ID: ${id}`;
        return resp.json(json);
      }

      await UsersServices.changePassword(password, id);
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

  deleteUser: async (req, resp) => {
    let json = { status: "", data: {} };
    await UsersServices.deleteUser(req.params.id);
    resp.json(json);
  },
};
