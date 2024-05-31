const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (data, data_iv) => {
  const newIv = data_iv ? Buffer.from(data_iv, "hex") : iv;
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), newIv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: newIv.toString("hex"), data: encrypted };
};

const decrypt = (encrypted) => {
  const iv = Buffer.from(encrypted.iv, "hex");
  const encryptedText = Buffer.from(encrypted.data, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
