import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import registerReducer from "../actions/registerSlice";
import loginReducer from "../actions/loginSlice";
import profileReducer from "../actions/profileSlice";
import animalsReducer from "../actions/animalSlice";
import adoptionsReducer from "../actions/adoptionSlice";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  profile: profileReducer,
  animals: animalsReducer,
  adoptions: adoptionsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
