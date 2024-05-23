const db = require("../db");

module.exports = {
  verifyID: (id) => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
        if (error) return reject(error);
        console.log("result", result);
        if (accept.length > 0) {
          accept(result[0]);
        } else {
          accept(false);
        }
      });
    });
  },

  changePassword: (password, id) => {
    return new Promise((accept, reject) => {
      db.query("UPDATE users SET password = ? WHERE users.id = ? ", [password, id], (error, result) => {
        if (error) return reject(error);
        if (accept.length > 0) {
          accept(result[0]);
        } else {
          accept(false);
        }
      });
    });
  },
};
