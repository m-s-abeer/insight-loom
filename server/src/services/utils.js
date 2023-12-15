const crypto = require("crypto");

function hashUserIdentifier(userIdentifier, salt) {
  const hash = crypto.createHash("sha256");
  hash.update(userIdentifier + salt);
  return hash.digest("hex");
}

module.exports = { hashUserIdentifier };
