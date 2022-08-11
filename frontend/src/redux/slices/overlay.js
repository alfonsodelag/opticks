import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'overlay',
    initialState: false,
    reducers: {
        show: state => state = true,
        hide: state => state = false
    }
});