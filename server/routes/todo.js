const _ = require("lodash");
const todos = require("../database/todo-queries.js");
const common = require("./common.js");

function createToDo(req, data) {
  const protocol = req.protocol,
    host = req.get("host"),
    id = data.id;

  return {
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    board_id:data.board_id,
    url: `${protocol}://${host}/board/${data.board_id}/todo/${id}`,
  };
}

async function getAllTodos(req, res) {
  const allEntries = await todos.all();
  return res.send(allEntries.map(_.curry(createToDo)(req)));
}

async function getTodo(req, res) {
  const todo = await todos.get(req.params.id);
  return res.send(todo);
}

async function postTodo(req, res) {
  const board_id = req.params.boardId;
  const created = await todos.create(req.body.title, req.body.order, board_id);
  return res.send(createToDo(req, created));
}

async function patchTodo(req, res) {
  const patched = await todos.update(req.params.id, req.body);
  return res.send(createToDo(req, patched));
}

async function deleteAllTodos(req, res) {
  const deletedEntries = await todos.clear();
  return res.send(deletedEntries.map(_.curry(createToDo)(req)));
}

async function deleteTodo(req, res) {
  const deleted = await todos.delete(req.params.id);
  return res.send(createToDo(req, deleted));
}

const toExport = {
  getAllTodos: {
    method: getAllTodos,
    errorMessage: "Could not fetch all todos",
  },
  getTodo: { method: getTodo, errorMessage: "Could not fetch todo" },
  postTodo: { method: postTodo, errorMessage: "Could not post todo" },
  patchTodo: { method: patchTodo, errorMessage: "Could not patch todo" },
  deleteAllTodos: {
    method: deleteAllTodos,
    errorMessage: "Could not delete all todos",
  },
  deleteTodo: { method: deleteTodo, errorMessage: "Could not delete todo" },
};

for (let route in toExport) {
  toExport[route] = common.addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
