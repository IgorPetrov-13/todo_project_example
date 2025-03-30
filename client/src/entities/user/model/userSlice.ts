import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  TypeUser,
  TypeUserAuthorization,
  TypeUserRegistration,
  TypeUserWithAccessToken,
} from '../types/userTypes';
import UserApi from '../api/userApi';

export type TypeUserInitialState = {
  user: TypeUser | null;
  accessToken: string;
  error: string | null;
  isLoading: boolean;
};

export const initialState: TypeUserInitialState = {
  user: null,
  accessToken: '',
  error: null,
  isLoading: false,
};

export type ApiError = {
  message: string;
};

export const registrationUser = createAsyncThunk<TypeUserWithAccessToken, TypeUserRegistration>(
  'user/registration',
  async (data, { rejectWithValue }) => {
    try {
      const response = await UserApi.getUserByRegistration(data);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Registration failed');
      }
      return rejectWithValue('Registration failed');
    }
  },
);

export const authorizationUser = createAsyncThunk<
  TypeUserWithAccessToken,
  TypeUserAuthorization,
  { rejectValue: string }
>('authorization/user', async (data, { rejectWithValue }) => {
  try {
    const response = await UserApi.getUserByAuthorization(data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = (error.response?.data as ApiError)?.message;
      return rejectWithValue(serverMessage || error.message);
    }
    return rejectWithValue('Authorization failed');
  }
});

export const refreshUser = createAsyncThunk('refresh/user', () => UserApi.getUserByRefreshToken());

export const logoutUser = createAsyncThunk('logout/user', () => UserApi.logoutUser());

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fulfilled
    builder.addCase(registrationUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(authorizationUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.accessToken = '';
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    });

    // rejected
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.user = null;
      state.accessToken = '';
      state.error = action.payload as string;
      state.isLoading = false;
    });
    builder.addCase(authorizationUser.rejected, (state, action) => {
      state.user = null;
      state.accessToken = '';
      state.error = action.payload as string;
      state.isLoading = false;
    });
    builder.addCase(registrationUser.rejected, (state, action) => {
      state.user = null;
      state.accessToken = '';
      state.error = action.payload as string;
      state.isLoading = false;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.user = null;
      state.accessToken = '';
      state.error = action.payload as string;
      state.isLoading = false;
    });

    // pending
    builder.addCase(registrationUser.pending, (state) => {
      state.user = null;
      state.accessToken = '';
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(authorizationUser.pending, (state) => {
      state.user = null;
      state.accessToken = '';
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.user = null;
      state.accessToken = '';
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.user = null;
      state.accessToken = '';
      state.isLoading = true;
      state.error = null;
    });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice;
