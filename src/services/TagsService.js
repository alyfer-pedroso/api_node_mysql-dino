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

  newTag: (desc) => {
    return new Promise((accept, reject) => {
      db.query("INSERT INTO Tags (description) VALUES (?);", [desc], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },
};
