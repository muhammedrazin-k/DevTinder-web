import axios from 'axios'
import React from 'react'
import { Base_URL } from '../utils/constant'

const Premium = () => {

    const handleBuy=async(type)=>{
        try {
            const order=await axios.post(Base_URL+"/payment/create",{membershipType:type},{withCredentials:true})

            //it should open a payment dialog after the order success

            const {keyId,amount,currency,notes,orderId}=order.data

            var options = {
                "key": keyId, 
                "amount": amount,  
                "currency": currency,
                "name": "Dev Tinder", 
                "description": "Connect to the developers",
                "image": "https://example.com/your_logo",
                "order_id": orderId,
                // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                "prefill": {
                    "name": notes.firstName + notes.lastName, 
                    "email": notes.EmailId,
                    "contact": "+919876543210" 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open()

        } catch (err) {
            console.log(err)
            
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Silver Membership */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Silver Membership</h2>
        <p className="text-gray-600 mb-6">
          Basic premium access with limited features. Perfect for beginners.
        </p>

        <ul className="text-gray-600 space-y-2 mb-6">
          <li>✔ chat with other people</li>
          <li>✔ 100 connection Request per day</li>
          <li>✔ Blue tick </li>
          <li>✔ 3 months </li>
        </ul>

        <div className="text-3xl font-bold mb-6">₹199 / month</div>

        <button className="w-full bg-gray-700 text-white py-2 rounded-xl hover:bg-gray-800 transition" onClick={()=>handleBuy('silver')}>
          Choose Silver
        </button>
      </div>

      {/* Gold Membership */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-yellow-400">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">Gold Membership</h2>
        <p className="text-gray-600 mb-6">
          Unlock all premium features with priority support.
        </p>

        <ul className="text-gray-600 space-y-2 mb-6">
          <li>⭐ Access to all features</li>
          <li>⭐ 4 month</li>
          <li>⭐ blue tick</li>
          <li>⭐ Bonus tools & insights</li>
        </ul>

        <div className="text-3xl font-bold mb-6">₹399 / month</div>

        <button className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition" onClick={()=>handleBuy('gold')}>
          Choose Gold
        </button>
      </div>

    </div>
  </div>
  )
}

export default Premium