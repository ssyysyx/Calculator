import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
    // reducer: reducer
    // 可简写
    reducer
});

export default store;