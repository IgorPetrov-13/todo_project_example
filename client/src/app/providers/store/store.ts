import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../../entities/user/model/userSlice';
import todoSlice from '../../../entities/todo/model/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    user: userSlice.reducer,
  },
});

// типизация
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
// пользовательские хуки
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
