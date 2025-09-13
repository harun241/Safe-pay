import { createSlice } from "@reduxjs/toolkit";

 const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        userIn: (state, action) => {
            return action.payload;
        }
    }
 })

 export const {userIn} = userSlice.actions

export default userSlice.reducer;