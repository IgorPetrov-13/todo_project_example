import axiosInstance from '../../../services/axiosInstance';
import type {
  TypeTodo,
  TypeTodoId,
  TypeTodos,
  TypeTodoUserId,
  TypeTodoWithoutId,
} from '../types/todoTypes';

class TodoApi {
  static async getTodosForUser(userId: TypeTodoUserId): Promise<TypeTodos> {
    const response = await axiosInstance.get<TypeTodos>(`todos/user/${userId}`);
    return response.data;
  }

  static async addTodoForUser(userId: TypeTodoUserId, data: TypeTodoWithoutId): Promise<TypeTodo> {
    const response = await axiosInstance.post<TypeTodo>(`todos/user/${userId}`, data);
    return response.data;
  }

  static async deleteTodoForUser(todoId: TypeTodoId, userId: TypeTodoUserId): Promise<TypeTodo> {
    const response = await axiosInstance.delete<TypeTodo>(`todos/${todoId}/user/${userId}`);
    return response.data;
  }

  static async updateTodoForUser(
    todoId: TypeTodoId,
    userId: TypeTodoUserId,
    data: TypeTodo,
  ): Promise<TypeTodo> {
    const response = await axiosInstance.put<TypeTodo>(`todos/${todoId}/user/${userId}`, data);
    return response.data;
  }
}

export default TodoApi;
