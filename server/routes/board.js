const _ = require("lodash");
const boards = require("../database/board-queries.js");
const common = require("./common.js");

async function getAllBoards(req, res) {
  const allEntries = await boards.all();
  return res.send(allEntries);
}

async function getBoard(req, res) {
  const board = await boards.get(req.params.id);
  return res.send(board);
}

async function postBoard(req, res) {
  const { name, description } = req.body;
  const created = await boards.create(name, description);
  return res.send(created);
}

const toExport = {
  getAllBoards: {
    method: getAllBoards,
    errorMessage: "Could not fetch all boards",
  },
  getBoard: { method: getBoard, errorMessage: "Could not fetch board" },
  postBoard: { method: postBoard, errorMessage: "Could not post board" },
};

for (let route in toExport) {
  toExport[route] = common.addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
