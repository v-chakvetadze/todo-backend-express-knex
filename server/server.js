const app = require("./server-config.js");
const boardRoutes = require("./routes/board.js");
const todoRoutes = require("./routes/todo.js");

const port = process.env.PORT || 5000;

app.get("/board", boardRoutes.getAllBoards);
app.get("/board/:boardId/", boardRoutes.getBoard);

app.post("/board", boardRoutes.postBoard);

app.get("/board/:boardId/todo", todoRoutes.getAllTodos);
app.get("/board/:boardId/todo/:id", todoRoutes.getTodo);

app.post("/board/:boardId/todo", todoRoutes.postTodo);
app.patch("/board/:boardId/todo/:id", todoRoutes.patchTodo);

app.delete("/board/:boardId/todo", todoRoutes.deleteAllTodos);
app.delete("/board/:boardId/todo/:id", todoRoutes.deleteTodo);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;

/*
Users 
Id
Name
Email

POST /Login
POST /Register
PUT  /user/{userId}

Boards
Id
Name
Description

Create board  - POST   /board
Update board  - PUT    /board/{boardId}
Delete board  - DELETE /board/{boardId}
Invite user   - POST   /board/{boardId}/inviteUser
Set user role - POST   /board/{boardId}/setRole

BoardUser
BoardId
UserId
RoleId

Roles
Id
Name

Users <-> Boards

Todo
Name VARCHAR (255)
Description TEXT
Status [ 'ToDo', 'InProgress' , 'Finished' , 'Cancelled' ]
BoardId

Create task    - POST   /board/{boardId}/task
Update task    - PUT    /board/{boardId}/task/{taskId}
Delete task    - DELETE /board/{boardId}/task/{taskId}
Get tasks      - GET    /board/{boardId}/task
Get task by id - GET    /board/{boardId}/task/{taskId}

Comments
Id
Content TEXT

Create comment - POST   /board/{boardId}/task/{taskId}/comment
Update comment - PUT    /board/{boardId}/task/{taskId}/comment/{commentId}
Get comments   - GET    /board/{boardId}/task/{taskId}/comment
Delete comment - DELETE /board/{boardId}/task/{taskId}/comment/{commentId}

*/
