import todoDataReducer from "./todoDataReducer";

export default ({ todoData }, action) => ({
  todoData: todoDataReducer(todoData, action),
});
