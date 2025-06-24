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
    if(Requests.length===0) return <h1 className='flex justify-center my-10'>there is no Requests yet</h1>

  return (
    <div className=" justify-center my-10">
    <h1 className='text-center text-3xl font-poppins font-bold text-red-900'>Requests</h1>

    {Requests.map((Request)=>{
        const {_id,firstName,lastName,photoUrl,gender,age,about}=Request.fromUserId

        return(
            <div key={_id} className='m-20 flex justify-center'>
            <div  className='flex mx-10  p-4 px-10 border bg-stone-300 rounded-xl w-2/3 items-center justify-between' >
                <div>
                <img className='rounded-full' src={photoUrl} alt="photo" width='180px' />
                </div>
                <div className="text mx-10 text-left p-12 w-1/2">
                    <h1 className='text-3xl font-bold font-poppins'>{firstName+' '+lastName}</h1>
                    {(age && gender) && <p>{age +' '+ gender}</p>}
                    <p className='text-xl'>{about}</p>
                </div>
                <div className='flex'>
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest('rejected',Request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest('accepted',Request._id)}>Accept</button>
                </div>
            </div>
            </div>
        )
    })}
</div>
  )
}

export default Requests