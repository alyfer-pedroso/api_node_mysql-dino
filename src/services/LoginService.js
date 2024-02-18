const db = require("../db");

module.exports = {
  searchAll: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users", (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  register: (user, password) => {
    return new Promise((accept, reject) => {
      db.query("INSERT INTO users (user, password) values (?, ?)", [user, password], (error, result) => {
        if (error) return reject(error);
        if (accept.length > 0) {
          accept(result[0]);
        } else {
          accept(false);
        }
      });
    });
  },

  verifyLogin: (user, password) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users WHERE user = ? AND password = ? ", [user, password], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  deleteUser: (id) => {
    return new Promise((accept, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },
};
