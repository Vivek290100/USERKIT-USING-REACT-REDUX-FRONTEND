// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';



const loadState = () =>{
  try {
    const serializedState = localStorage.getItem("authState")
    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}


const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("authState", serializedState)
  } catch {

  }
}

const initialState = loadState() || {
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      saveState(state)
    },
    setToken(state, action) {
      state.token = action.payload;
      saveState(state)

    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      saveState(state)

    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setToken, clearAuth, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
