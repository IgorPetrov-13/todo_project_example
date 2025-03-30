export type TypeTodo = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  userId: number;
};

export type TypeTodoId = TypeTodo['id'];
export type TypeTodoUserId = TypeTodo['userId'];
export type TypeTodoWithoutId = Omit<TypeTodo, 'id'>;

export type TypeTodos = TypeTodo[];
// export type TypeTodosWithSuccess = { todos: TypeTodos; success: string };


export type TypeRegistration = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};
