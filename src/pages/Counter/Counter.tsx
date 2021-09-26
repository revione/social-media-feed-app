// libraries
import { useState } from "react"
// hooks
import { useSelector, useDispatch } from "app/hooks"
// actions
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  incrementAync,
  decrementAync,
} from "features/counter/slice"
// styles
import { Wrapper } from "./styles"

const Counter = () => {
  const { value } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(5)
  const [amountAsync, setamountAsync] = useState(5)

  return (
    <Wrapper>
      <div>{value}</div>

      <div>
        <div>Increment by amount</div>
        <div>
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>-</button>
        </div>
      </div>
      <div>
        <div>Increment by amount</div>
        <input
          type="number"
          onChange={(e) => setAmount(+e.target.value)}
          value={amount}
        />
        <div>
          <button onClick={() => dispatch(incrementByAmount(amount))}>+</button>
          <button onClick={() => dispatch(decrementByAmount(amount))}>-</button>
        </div>
      </div>
      <div>
        <div>Async - increment by amount</div>
        <div>After 1000 miliseconds</div>
        <input
          type="number"
          onChange={(e) => {
            setamountAsync(+e.target.value)
          }}
          value={amountAsync}
        />
        <div>
          <button onClick={() => dispatch(incrementAync(amountAsync))}>
            +
          </button>
          <button onClick={() => dispatch(decrementAync(amountAsync))}>
            -
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default Counter
