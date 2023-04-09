import React , { useState } from 'react'
import "./Quantity.css"

const Quantity = (props) => {

  const [count, setCount] = useState(1)

  const increment = ()=>{
    setCount(count+1)
  }

  const decrement = ()=>{
    setCount(count==1?count:count-1)
  }

  return (
    <div>
        <div className="quantityBox">
            <div className='quantityHeading'>Quantity</div>
            <div className='quantityChange'>
                <button type="button" onClick={decrement} className='quantityButton non-integer-button'>-</button>
                <input className='quantityButton' name="quantity" value={count} type="hidden" />
                <span className='quantityButton'>{count}</span>
                <button type="button" onClick={increment} className='quantityButton non-integer-button'>+</button>
            </div>
        </div>
        <p className={props.priceClass}>
          <span><i class="fa-solid fa-indian-rupee-sign"></i> {count*props.productPrice}</span>
        </p>
    </div>
  )
}

export default Quantity