const LoginService = require("../services/LoginService");

module.exports = {
  searchAll: async (req, resp) => {
    let json = { status: "", data: [] };
    const users = await LoginService.searchAll();
    for (let i in users) {
      json.data.push({
        id: users[i].id,
        user: users[i].user,
        password: users[i].password,
      });
    }
    resp.json(json);
  },

  register: async (req, resp) => {
    let json = { status: "", data: {} };
    let user = req.body.user;
    let password = req.body.password;

    if (user && password) {
      const verifyIfExist = await LoginService.verifyLogin(user, password);
      if (verifyIfExist.length > 0) {
        json.status = "Usuário ja existente";
        return resp.json(json);
      }
      const registerID = await LoginService.register(user, password);
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

  verifyLogin: async (req, resp) => {
    let json = { status: "", data: {} };
    let user = req.body.user;
    let password = req.body.password;

    if (user && password) {
      const result = await LoginService.verifyLogin(user, password);
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

  deleteUser: async (req, resp) => {
    let json = { status: "", data: {} };
    await LoginService.deleteUser(req.params.id);
    resp.json(json);
  },
};
