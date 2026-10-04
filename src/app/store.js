import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import threadsReducer from '../features/threads/threadsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
});
