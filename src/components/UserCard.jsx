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
      <div className="card bg-stone-200 w-96 shadow-sm border" >
        <figure>
          <img
            src={photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName +' '+lastName} </h2>
          <p>
            {about}
          </p>
        { age && gender &&<p>
        {gender+' '+ age}
        </p>}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={()=>handleSendRequest('ignored',_id)}>Ignored</button>
            <button className="btn btn-secondary" onClick={()=>handleSendRequest('interested',_id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
