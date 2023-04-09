import React from "react"
import Pranjul from "../../assets/pranjul.jpg"

const Payment = ({
    price,
    className,
    quantity
})=>{
    var options = {
        "key": "rzp_test_BLW2JsYmfE2AQj", // Enter the Key ID generated from the Dashboard
        "amount": price*quantity*100,
        "currency": "INR",
        "description": "Zolocart",
        "image": Pranjul,
        "height":"80%",
        "prefill":
        {
          "email": "20eo1041@mitsgwl.ac.in",
          "contact": +918319961139,
        },
        config: {
          display: {
            blocks: {
                banks: {
                    name: 'All payment methods',
                    instruments: [
                      {
                        method: 'upi'
                      },
                      {
                        method: 'card'
                      },
                      {
                          method: 'wallet'
                      },
                      {
                          method: 'netbanking'
                      }
                    ],
                  },
            },
            
            sequence: ["block.banks"],
            preferences: {
              show_default_blocks: false // Should Checkout show its default blocks?
            }
          }
        },
        "handler": function (response) {
          alert(response.razorpay_payment_id);
        },
        "modal": {
          "onDismiss": function (e) {
            e.preventDefault();
            console.log(e.target.style)
            if (confirm("Are you sure, you want to close the form?")) {
              txt = "You pressed OK!";
              console.log("Checkout form closed by the user");
            } else {
              txt = "You pressed Cancel!";
              console.log("Complete the Payment")
            }
          }
        }
    };
    
    var rzp1 = new Razorpay(options);

    function razorpayButton(e) {
    rzp1.open();
    e.preventDefault();
    }

    return (
    <button id="rzp-button1" onClick={razorpayButton} className={className}>Buy Now</button>
    )

}

export default Payment;

