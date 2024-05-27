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
};
