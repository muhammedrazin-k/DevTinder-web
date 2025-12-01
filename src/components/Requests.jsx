import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch=useDispatch()
    const Requests=useSelector((store)=>store.requests)

    const reviewRequest=async(status,id)=>{
        try {
            const res=await axios.post(Base_URL +'/request/review/'+ status +'/'+id,{},{withCredentials:true})
            dispatch(removeRequest(id))
            
        } catch (err) {
            console.log(err)
        }
    }

    const fetchRequests=async()=>{
        try {
            const res= await axios.get(Base_URL + '/user/requests/received',{withCredentials:true})
            dispatch(addRequests(res.data?.data))
            
            
        } catch (err) {
            console.log(err)
            
        }
    }

    
    useEffect(()=>{
        fetchRequests()
    },[])

    if(!Requests) return
    if(Requests.length===0) return <h1 className='flex justify-center my-10 text-white'>there is no Requests yet</h1>

  return (
    <div className=" justify-center my-10">
    <h1 className='text-center text-3xl font-poppins font-bold  text-white'>Requests</h1>

    {Requests.map((Request)=>{
        const {_id,firstName,lastName,photoUrl,gender,age,about}=Request.fromUserId

        return(
            <div key={_id} className='m-8 flex justify-center'>
            <div  className='flex flex-col lg:flex-row items-center   bg-gradient-to-r from-rose-300 to-orange-200  hover:shadow-[2px_-15px_20px_rgba(0,0,0,0.9)] rounded-xl p-4  w-3/4 hover:scale-105 transition-all duration-1000' >
                
                <img className='rounded-full w-[140px] lg:w-[180px] h-[140px] lg:h-[180px] object-cover hover:scale-110 hover:rotate-3 transition-all duration-1000 ' src={photoUrl} alt="photo"  />
                
                <div className="textdiv px-3 flex flex-col justify-center  ">
                <div className="text text-center lg:text-left">
                    <h1 className='text-xl sm:text-2xl font-bold font-poppins uppercase'>{firstName+' '+lastName}</h1>
                    {(age && gender) && <p>{age +' '+ gender}</p>}
                    <p className='text-md lg:text-lg leading-none sm:leading-tight'>{about}</p>
                </div>
                <div className='flex mt-[4%] justify-center lg:justify-start'>
                <button className="btn btn-primary w-[40%] text-lg uppercase hover:shadow-[2px_12px_20px_rgba(0,0,0,0.6)] hover:scale-95 transition-all duration-[500ms]" onClick={()=>reviewRequest('rejected',Request._id)}>Reject</button>
                <button className="btn btn-secondary ml-3 w-[40%] text-lg uppercase hover:shadow-[2px_12px_20px_rgba(0,0,0,0.6)] hover:scale-95 transition-all duration-[500ms]" onClick={()=>reviewRequest('accepted',Request._id)}>Accept</button>
                </div>
                </div>
            </div>
            </div>
        )
    })}
</div>
  )
}

export default Requests