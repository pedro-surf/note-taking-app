import produce from "immer";

export default (data, action) => {
  switch (action.type) {
    case "setTodos":
      return produce(data, (draft) => {
        draft.todos = [...draft.todos, ...action.todos];
        draft.count = draft.todos.length;
      });

    case "removeTodo":
      return produce(data, (draft) => {
        draft.todos = [...draft.todos.filter(({ id }) => id !== action.id)];
        draft.count = draft.todos.length;
      });

    case "addTodo":
      return produce(data, (draft) => {
        draft.todos = [...draft.todos, action.todo];
        draft.count = draft.todos.length;
      });

    case "patchTodo":
      return produce(data, (draft) => {
        draft.todos = [
          ...draft.todos.map((todo) =>
            todo.id === action.todo.id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        ];
        draft.count = draft.todos.length;
      });

    default:
      return data;
  }
};
