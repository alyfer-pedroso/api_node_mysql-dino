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

  verifyEmail: (email) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users WHERE email = ? ", [email], (error, result) => {
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

  verifyLogin: (email, password) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users WHERE email = ? AND password = ? ", [email, password], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  register: (email, user, password) => {
    return new Promise((accept, reject) => {
      db.query("INSERT INTO users (email, user, password) values (?, ?, ?)", [email, user, password], (error, result) => {
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
