import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'favoriteList',
    initialState: {},
    reducers: {
        add: (state, action) => {
            if (Array.isArray(action.payload)) {
                action.payload.forEach(
                    favoredItem =>  {
                        state[favoredItem.id] = favoredItem
                    }
                );
            } else {
                state[action.payload.id] = action.payload;
            }
        },
        remove: (state, action) => {
            delete state[action.payload.id];
        }
    }
});