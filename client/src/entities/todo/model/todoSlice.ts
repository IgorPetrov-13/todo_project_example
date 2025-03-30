import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  TypeTodo,
  TypeTodoId,
  TypeTodos,
  TypeTodoUserId,
  TypeTodoWithoutId,
} from '../types/todoTypes';
import TodoApi from '../api/todoApi';

export type TypeTodosInitialState = {
  todos: TypeTodos;
  error: string | null;
  isLoading: boolean;
};

export const initialState: TypeTodosInitialState = {
  todos: [],
  error: null,
  isLoading: false,
};

export const loadAllUsersTodos = createAsyncThunk<
  TypeTodos,
  TypeTodoUserId,
  {
    rejectValue: string;
  }
>('load/todos', async (userId, { rejectWithValue }) => {
  try {
    return await TodoApi.getTodosForUser(userId);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});

export const addTodo = createAsyncThunk<
  TypeTodo,
  { userId: TypeTodoUserId; data: TypeTodoWithoutId },
  {
    rejectValue: string;
  }
>('add/todo', async ({ userId, data }, { rejectWithValue }) => {
  try {
    const response = await TodoApi.addTodoForUser(userId, data);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to add todo');
  }
});

export const deleteTodo = createAsyncThunk<
  TypeTodo,
  { todoId: TypeTodoId; userId: TypeTodoUserId },
  { rejectValue: string }
>('delete/todo', async ({ todoId, userId }, { rejectWithValue }) => {
  try {
    const response = await TodoApi.deleteTodoForUser(todoId, userId);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to delete todo');
  }
});

export const updateTodo = createAsyncThunk<
  TypeTodo,
  { todoId: TypeTodoId; userId: TypeTodoUserId; data: TypeTodo },
  { rejectValue: string }
>('update/todo', async ({ todoId, userId, data }, { rejectWithValue }) => {
  try {
    const response = await TodoApi.updateTodoForUser(todoId, userId, data);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to update todo');
  }
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadAllUsersTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAllUsersTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loadAllUsersTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to load todos';
      });

    builder
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        if (action.payload) {
          state.todos.push(action.payload);
        }
        state.error = null;
        state.isLoading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to add todos';
      });

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((el) => el.id !== action.meta.arg.todoId);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to delete todos';
      });

    builder
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((el) => (el.id === action.payload.id ? action.payload : el));
        state.error = null;
        state.isLoading = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to update todos';
      });
  },
});

export default todoSlice;
