import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../api';

// const BASE_URL = 'https://67bf6822b2320ee05013a09c.mockapi.io/auth';

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
    try {
        const response = await instance.post('/users/signup', userData);

        const { user, token } = response.data;

        localStorage.setItem('token', token);

        return { user, token };
    } catch (error) {
      console.error('Eroare la înregistrare:', error.response.data);
      throw error.response.data;
    }
});

export const loginUser = createAsyncThunk(
  'auth/login',
    async userData => {
        try {
            const response = await instance.post('/users/login', userData);

            const { user, token } = response.data;

            console.log('Token receiver from the server: ', token);

            localStorage.setItem('token', token);

            return { user, token };
        } catch (error) {
          console.error('Eroare la autentificare:', error.response.data);
          throw error.response.data;
        }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await instance.post('/users/logout');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
          
        console.log('Token saved in Redux state: ', state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      });
  },
});

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
