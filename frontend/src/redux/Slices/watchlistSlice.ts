
import type { Product } from "../../types/product.types";
import {createSlice ,type PayloadAction} from "@reduxjs/toolkit";
 
interface WatchlistState {
    items : Product[];
}

const initialState : WatchlistState = {
    items : []
}

const watchlistSlice = createSlice({
    name : "watchlist",
    initialState,
    reducers : {
        addToWatchlist : (state, action : PayloadAction<Product>) => {
            const exists = state.items.find((item)=> item.id === action.payload.id);
            if(!exists) {
                state.items.push(action.payload)
            }
        } ,
          
        removeFromWatchList : (state , action: PayloadAction<number>) =>{
           state.items =  state.items.filter((item)=> item.id !== action.payload) 
        }
    }      
});

export const {addToWatchlist , removeFromWatchList} = watchlistSlice.actions;
export default watchlistSlice.reducer;