class Sucessful {
  constructor(data) {
    this.message = "Sucesso!";
    this.error = null;
    this.data = data;
    this.type = 1;
  }
}

class Error {
  constructor(data) {
    this.message = "Ocorreu um Erro!";
    this.error = {
      error: data,
    };
    this.data = null;
    this.type = 0;
  }
}

module.exports = { Sucessful, Error };
