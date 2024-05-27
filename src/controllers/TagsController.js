const { Sucessful, Error } = require("../classes");
const TagsService = require("../services/TagsService");

module.exports = {
  getAll: async (_req, resp) => {
    try {
      const tags = await TagsService.getAll();
      resp.json(new Sucessful(tags));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  newTag: async (req, resp) => {
    try {
      const { description } = req.body;
      if (!description) return resp.json(new Error("Preencha todos os campos!", "Cadastro inválido!"));
      await TagsService.newTag(description);
      resp.json(new Sucessful(req.body, "Cadastro efetuado com sucesso!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },
};
