import React , { useEffect,useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from "axios"
import "./CartPage.css"
import Payment from '../../components/Modal/Payment';

const CartPage = ({
  isAuthorized,
  setIsAuthorized
}) => {
  const navigate = useNavigate();
  const [userProducts,setUserProducts] = useState([])
  const [quantity,setQuantity] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    if(!isAuthorized)(
      navigate("/")
    )

    const controller = new AbortController();

    const fetchProducts = async ()=>{
      const url = "http://localhost:5000/products/getUserProducts"

      const response = await axios.get(url,{
        signal:controller.signal,
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('jwt-token'))}`
        }
      })
      .catch((error)=>{
        // localStorage.removeItem('jwt-token')
        // localStorage.removeItem('username')
        // setIsAuthorized(false)
        console.log(error)
      })

      if(response){
        const data = await response.data;
        console.log(data.products)
        setUserProducts(data.products)
        setQuantity(data.productQuantity)
        setIsLoading(false)
      }

    }

    if(isLoading){
      fetchProducts()
    }

    return ()=>{
      return controller.abort();
    }

  },[])

  const removeUserItem = (event)=>{
    event.preventDefault();
    const removeProducts = async ()=>{
      const url = "http://localhost:5000/products/removeUserItem/"+event.target.id.value

      const response = await axios.delete(url,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('jwt-token'))}`
        }
      })
      .catch((error)=>{
        console.log(error)
      })

      const products = userProducts.map((value,index)=>{
        if(index !== parseInt(event.target.index.value)){
          return value
        }
      })

      setUserProducts(products)
      return navigate("/")
    }

    removeProducts()
  }

  return (
    <header>
        <Link className="backButton" to="/">{"<-"} Back To Home Page</Link>
        <div className='cartProductBox'>
        {userProducts.length>=1?userProducts.map((product,index)=>{
          return (<div className="cartProductCard" key={index}>
            <div className="Figure">
              <img src={product.productImage} className="cartProductImage" alt={product.productName} />
            </div>
            <div className="cartProductBody">
              <h1 className='cartProductHeading'>{product.productName.substring(0,40)+"..."}</h1>
              <h2 className="cartProductDescription">{product.productDescription.substring(0,150)+"..."}</h2>
              <p className="cartQuantityBox">
                <span>Quantity : </span><span>{quantity[index]}</span>
              </p>
              <p className="cartProductPrice">
                <span>
                 Price : &nbsp;<i class="fa-solid fa-indian-rupee-sign"></i> {quantity[index]*product.productPrice}
                </span>
              </p>
              <form onSubmit={removeUserItem}>
                <input type="hidden" value={product._id} name="id" />
                <input type="hidden" value={index} name="index" />
                <button type="submit" className="removeButton">Remove From Cart</button>
              </form>
              <Payment price={product.productPrice} className={"buyButton"} quantity={quantity[index]}></Payment>
            </div>
          </div>)
        }):
        <div className='cartProductBox'>
        <h1>Nothing To see here...</h1>
        </div>}
      </div>
    </header>
  )
}

export default CartPage