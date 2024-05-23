const UserService = require("../services/UserService");

module.exports = {
  changePassword: async (req, resp) => {
    let json = { status: "", data: {} };
    let password = req.body.password;
    let id = req.body.id;

    if (password && id) {
      const verifyIfExist = await UserService.verifyID(id);
      if (verifyIfExist.length < 1) {
        json.status = `Não foi possível encontrar o ID: ${id}`;
        return resp.json(json);
      }

      await UserService.changePassword(password, id);
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
};
