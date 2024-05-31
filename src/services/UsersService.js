const db = require("../db");

module.exports = {
  findByID: (id) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM Users WHERE id = ?", [id], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM Users WHERE email = ? ", [email], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  searchAll: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM Users", (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  verifyLogin: (email, password) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM Users WHERE email = ? AND password = ? ", [email, password], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  register: (email, user, password, iv) => {
    return new Promise((accept, reject) => {
      db.query("INSERT INTO Users (email, user, password, iv) values (?, ?, ?, ?)", [email, user, password, iv], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  deleteUser: (id) => {
    return new Promise((accept, reject) => {
      db.query("DELETE FROM Users WHERE id = ?", [id], (error, result) => {
        if (error) return reject(error);
        accept(result);
      });
    });
  },

  changePassword: (id, password, iv) => {
    return new Promise((accept, reject) => {
      db.query("UPDATE Users SET password = ?, iv = ? WHERE Users.id = ? ", [password, iv, id], (error, result) => {
        if (error) return reject(error);
        accept.length > 0 ? accept(result[0]) : accept(false);
      });
    });
  },

  setOnline: (online, id) => {
    return new Promise((accept, reject) => {
      db.query("UPDATE Users SET online = ? WHERE Users.id = ? ", [online, id], (error, result) => {
        if (error) return reject(error);
        accept.length < 0 ? accept(result[0]) : accept(false);
      });
    });
  },
};
