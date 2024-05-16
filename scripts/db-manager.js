const db = [];

function saveHash(payload) {
  db.push(payload);
}

function getImg() {
  return db[db.length - 1];
}

module.exports = {
  saveHash,
  getImg,
};
