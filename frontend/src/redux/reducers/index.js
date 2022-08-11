import { combineReducers } from "redux";
import overlaySlice from "@/redux/slices/overlay";
import favoriteListSlice from "@/redux/slices/favoriteList";

export default combineReducers({
  overlay: overlaySlice.reducer,
  favoriteList: favoriteListSlice.reducer,
});
