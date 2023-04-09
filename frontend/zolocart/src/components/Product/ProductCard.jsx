import React from 'react'

const ProductCard = ({
    index,
    productImage,
    productName,
    productPrice,
    productDescription
}) => {
  return (
    <div className="cartProductCard" key={index}>
        <div className="Figure">
            <img src={productImage} className="cartProductImage" alt={productName} />
        </div>
        <div className="cartProductBody">
            <h1 className='cartProductHeading'>{productName}</h1>
            <h2 className="cartProductDescription">{productDescription.substring(0,150)+"..."}</h2>

            <p className="productPrice">
            <span>
                <i class="fa-solid fa-indian-rupee-sign"></i> {productPrice}
            </span>
        </p>
        </div>
    </div>
  )
}

export default ProductCard