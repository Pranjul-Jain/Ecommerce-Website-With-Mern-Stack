import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React , { useState,useEffect } from "react";
import Quantity from '../Product/Quantity';
import axios from "axios"

function MyVerticallyCenteredModal({
  show,onHide,...props
}) {

  const [itemAdded, setitemAdded] = useState(false)


  const addItemToCart = (event)=>{
    event.preventDefault()

    if(itemAdded){
      return
    }


    const addItem = async ()=>{
      const url = "http://localhost:5000/products/addtocart"
      const response = await axios.post(url,{
        id : props._id,
        quantity : event.target.quantity.value,
      },{
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('jwt-token'))}`
        }
      }).catch(error=>{
        console.log(error.response.data)
      })

      if(response){
        const data = await response.data;
        console.log(data)
        setitemAdded(true);
      }

    }

    addItem();
  }

  const isItemAlreadyPresent = ()=>{
    let flag = false
    for(let i=0;i<props.cart.length;i++){
      if(props.cart[i].productID === props._id){
        flag = true
        break
      }
    }
    return flag
  }

  return (
    <Modal
      show = {show}
      onHide = {onHide}
      fullscreen = {true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.productName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div align="center">
          <img src={props.productImage} alt={props.productName} className={props.imageClass} />
        </div>
        <p className={props.descriptionClass} style={props.descriptionStyle}>
          {props.productDescription}
        </p>
        <h3>Features</h3>
        <ul>
          {props.productFeatures?props.productFeatures.map(item=>{
            return (<li>{item}</li>)
          }):null}
        </ul>
        <h3>Colors Available</h3>
        <ul>
          {props.productColors?props.productColors.map(item=>{
            return(
              <li>{item}</li>
            )
          }):<li>No Colors Available</li>}
        </ul>

       {!isItemAlreadyPresent()?
        <form onSubmit={addItemToCart}>
          {!itemAdded && props.isAuthorized?<Quantity productPrice={props.productPrice} priceClass={props.priceClass} />:null}
          {!itemAdded && props.isAuthorized?<button type="submit" className={props.buttonClass}>{props.buttonName}</button>:null}
        </form>
        :null
       }
        
      </Modal.Body>
      {
        !props.close?
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
        :null
      }
    </Modal>
  );
}

function ProductCardModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <h2 className={props.headingClass} variant="warning" onClick={() => setModalShow(true)}>
        {props.productName.substring(0,40)+"..."}
      </h2>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)
        }
        {...props}
      />
    </>
  );
}

export default ProductCardModal;