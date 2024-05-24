const db = require("../db");

module.exports = {
  verifyID: (id) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  searchAll: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users", (error, result) => {
        if (error) return reject(error);
        accept(result);
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

  register: (user, password) => {
    return new Promise((accept, reject) => {
      db.query("INSERT INTO users (user, password) values (?, ?)", [user, password], (error, result) => {
        if (error) return reject(error);
        accept.length > 0 ? accept(result[0]) : accept(false);
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

  changePassword: (password, id) => {
    return new Promise((accept, reject) => {
      db.query("UPDATE users SET password = ? WHERE users.id = ? ", [password, id], (error, result) => {
        if (error) return reject(error);
        accept.length > 0 ? accept(result[0]) : accept(false);
      });
    });
  },

  setOnline: (online, id) => {
    return new Promise((accept, reject) => {
      db.query("UPDATE users SET online = ? WHERE users.id = ? ", [online, id], (error, result) => {
        if (error) return reject(error);
        accept.length < 0 ? accept(result[0]) : accept(false);
      });
    });
  },
};
