class Sucessful {
  constructor(data, message) {
    this.message = message || "Sucesso!";
    this.error = null;
    this.data = data;
    this.type = 1;
  }
}

class Error {
  constructor(data, message) {
    this.message = message || "Ocorreu um Erro!";
    this.error = {
      error: data,
    };
    this.data = null;
    this.type = 0;
  }
}

module.exports = { Sucessful, Error };
