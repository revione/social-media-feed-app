import { useState } from "react"
import { useSelector, useDispatch } from "app/hooks"
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  incrementAync,
  decrementAync,
} from "features/counter/slice"

const Counter = () => {
  const { value } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0)
  const [amountAsync, setamountAsync] = useState(0)

  return (
    <div>
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
    </div>
  )
}

export default Counter
