import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const staticUsers = [
    { id: 1, name: 'Strawberry Shortcake', email: 'strawberry@berryland.com' },
    { id: 2, name: 'Blueberry Muffin', email: 'blueberry@berryland.com' },
    { id: 3, name: 'Lemon Meringue', email: 'lemon@berryland.com' },
    { id: 4, name: 'Raspberry Torte', email: 'raspberry@berryland.com' },
    { id: 5, name: 'Orange Blossom', email: 'orange@berryland.com' },
    { id: 6, name: 'Plum Pudding', email: 'plum@berryland.com' },
    { id: 7, name: 'Cherry Jam', email: 'cherryjam@berryland.com' },
    { id: 8, name: 'Huckleberry Pie', email: 'huckleberry@berryland.com' },
    { id: 9, name: 'Sweet Grapes', email: 'sweetgrapes@berryland.com' },
    { id: 10, name: 'Sour Grapes', email: 'sourgrapes@berryland.com' },
];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await new Promise((resolve) => 
        setTimeout(() => resolve(staticUsers), 2000)
    );
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: staticUsers, 
        status: 'idle',
        error: null
    },
    reducers: {
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { deleteUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;