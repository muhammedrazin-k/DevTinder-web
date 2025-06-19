import React from "react";

const UserCard = ({user}) => {
   
    const {firstName,lastName,age,about,photoUrl,gender}=user
    
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
          <h2 className="card-title">{firstName+' '+lastName} </h2>
          <p>
            {about}
          </p>
        { age && gender &&<p>
        {gender+' '+ age}
        </p>}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignored</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
