import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./features/authSlice";
import studentReducer from "./features/studentSlice";
const rootReducer = combineReducers({
  student: studentReducer,
  auth: authReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persistor
export const persistor = persistStore(store);
