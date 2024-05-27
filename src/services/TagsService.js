const db = require("../db");

module.exports = {
  getAll: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM Tags WHERE status = 1;", (error, result) => {
        if (error) reject(error);
        accept(result);
      });
    });
  },
};
