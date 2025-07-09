import axios from "axios";
import React from "react";
import { Base_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removefeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const {_id ,firstName,lastName,age,about,photoUrl,gender}=user
    const dispatch=useDispatch()

    const handleSendRequest=async(status,userId)=>{
      try {
        const res=await axios.post(Base_URL + '/request/send/' +status +'/'+ userId,{},{withCredentials:true})
        dispatch(removefeed(userId))
        
      } catch (err) {
        console.log(err)
        
      }
    }
    
      return (
    
    <div>
      <div className="card bg-gradient-to-tr from-blue-300 to-fuchsia-300 w-80 sm:w-96 shadow-[15px_26px_25px_rgba(0,0,0,0.5)] h-[600px] " >
        <figure>
          <img
            src={photoUrl}
            alt="Shoes"
            className="w-auto hover:scale-110 trasition-all duration-1000 ease-in-out"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-bold uppercase ">{firstName +' '+lastName} </h2>
        { age && gender &&<p className="text-center  mt-[-14px]">
        {gender+' '+ age}
        </p>}
          <p className="text-center">
            {about}
          </p>
          <div className=" justify-center flex">
            <button className="btn btn-primary w-[50%] mx-1 hover:shadow-[2px_14px_20px_rgba(0,0,0,0.5)] hover:scale-95 transition-all duration-[800ms] ease-in-out" onClick={()=>handleSendRequest('ignored',_id)}>Ignored</button>
            <button className="btn btn-secondary w-[50%] mx-1 hover:shadow-[2px_13px_20px_rgba(0,0,0,0.5)] hover:scale-95 transition-all duration-[800ms] ease-in-out " onClick={()=>handleSendRequest('interested',_id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
