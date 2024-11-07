import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  users: [],
  loading: false,
  error: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = false;
      state.error = false;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.isAdmin= false;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = false;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut:(state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.isAdmin = false;
    },

    // Admin Sign-in Actions
    adminSigninStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    adminSigninSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.isAdmin = true; 
    },
    adminSigninFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload; 
    },
    admindeleteUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    adminUpdateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user._id === updatedUser._id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  adminSigninStart,
  adminSigninSuccess,
  adminSigninFailure,
  setUsers,
  admindeleteUser,
  adminUpdateUser,
  signOut
} = userSlice.actions;
export default userSlice.reducer;