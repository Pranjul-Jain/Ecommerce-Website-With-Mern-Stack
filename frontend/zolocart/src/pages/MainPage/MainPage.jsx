import React , { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import Modals from '../../components/Modal/Modals'
import Login from '../../components/User/Login'
import LoginStyles from "../../components/User/Login.module.css"
import Register from '../../components/User/Register'
import Userbatch from "../../components/User/Userbatch"
import ProductCardModal from '../../components/Modal/ProductCardModal';
import axios from "axios"


const MainPage = ({
    isAuthorized,
    setIsAuthorized,
    userName,
    setUserName
}) => {

  const [products,setProducts] = useState([])
  const [carts,setCarts] = useState([])

  useEffect(()=>{

    const controller = new AbortController();

    if(localStorage.getItem('jwt-token')){
      const getUserCart = async ()=>{
        const url = "http://localhost:5000/products/getUserCart"

        const response = await axios.get(url,{
          signal:controller.signal,
          headers :{
            "content-type" : 'application/json',
            "authorization" : `Bearer ${JSON.parse(localStorage.getItem('jwt-token'))}`
          }
        }).catch(error=>{
          console.log(error.response.status)
          console.log(error.response.message)
        })

        if(response){
          const data = await response.data;
          console.log("data",data)
          setCarts(data.cart)
        }

      }
      getUserCart()
    }

    const fetchProducts = async ()=>{
      const url = "http://localhost:5000/products/all"

      const response = await axios.get(url,{
        signal:controller.signal
      })
      .catch((error)=>{
        console.log(error)
      })

      if(response){
        const data = await response.data;
        setProducts(data.products)
      }

    }

    if(products.length<1){
      fetchProducts()
    }

    return ()=>{
      return controller.abort();
    }
  },[])

  return (
    <div>
      <header className="mainHeader">
          <div className="headerCart">
            <Link to="/products"><i class="fa-solid fa-cart-shopping cartIcon"></i></Link>
          </div>
          <div className="headerButtons">
            {!isAuthorized?<Modals button="Login" heading="Login" Body={Login} styles={LoginStyles} close={true} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} setUserName={setUserName}  />:null}
            {!isAuthorized?<Modals button="Register" heading="Register" Body={Register} styles={LoginStyles} close={true} isAuthorized={isAuthorized}  />:null}
            {isAuthorized?<Userbatch batchclass={LoginStyles.userLogo} setIsAuthorized={setIsAuthorized} logoutClass={LoginStyles.logoutButton} username={userName} />:null}
          </div>
      </header>
      <section className='productBox'>
        {products?products.map((product,index)=>{
          return (<div className="productCard" key={index}>
            <img src={product.productImage} className="productImage" alt={product.productName} />
            <div className="productBody">
              <ProductCardModal isAuthorized={isAuthorized} headingClass={"productHeading"} imageClass="productImage" cart={carts} priceClass="productPrice" buttonName="Add To Cart" buttonClass="cartButton"  descriptionClass={"productDescription"} {...product} descriptionStyle={{fontSize:"21px"}} />
              <h2 className="productDescription">{product.productDescription.substring(0,40)+"..."}</h2>
              <hr />
              <p className="productPrice">
                <span>
                  <i class="fa-solid fa-indian-rupee-sign"></i> {product.productPrice}
                </span>
                <span className="add-to-cart">
                  {isAuthorized?<i class="fa-solid fa-cart-shopping" key={index} onClick={addItemToCart} added="false"></i>:null}
                </span>
              </p>
            </div>
          </div>)
        }):null}
      </section>
    </div>
  )

  async function addItemToCart(event){
    return null
  }
}

export default MainPage