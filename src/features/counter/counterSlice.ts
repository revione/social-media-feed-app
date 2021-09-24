// Ducks pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "app/store"

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
    decrementByAmount(state, action: PayloadAction<number>) {
      state.value -= action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount, decrementByAmount } =
  slice.actions

// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched
export const incrementAync = (amount: number) => (dispatch: AppDispatch) =>
  setTimeout(() => dispatch(incrementByAmount(amount)), 1000)

export const decrementAync = (amount: number) => (dispatch: AppDispatch) =>
  setTimeout(() => dispatch(decrementByAmount(amount)), 1000)

export default slice.reducer
