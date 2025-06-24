import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

function Connections() {
    const dispatch=useDispatch()
    const connections=useSelector((store)=>store.connections)
    const fetchConnections=async()=>{

        try {
            const res=await axios.get(Base_URL + '/user/connections',{withCredentials:true})
            dispatch(addConnections(res.data?.data))

        } catch (err) {
            console.log(err)
            
        }
    }

    useEffect(()=>{
        fetchConnections()
    },[])

    if(!connections) return

    if(connections.length===0) return <h1 className='flex justify-center my-10'> there is no  connections yet</h1>


  return (
    <div className=" justify-center my-10">
        <h1 className='text-center text-3xl font-poppins font-bold text-red-900'>Connections</h1>

        {connections.map((connections)=>{
            const {_id,firstName,lastName,photoUrl,gender,age,about}=connections

            return(
                <div key={_id} className='m-20 flex justify-center'>
                <div  className='flex mx-10  p-5 border bg-stone-300 rounded-xl w-1/2 ' >
                    <img className='rounded-full' src={photoUrl} alt="photo" width='180px' />
                    <div className="text mx-10 text-left p-12">
                        <h1 className='text-3xl font-bold font-poppins'>{firstName+' '+lastName}</h1>
                        {(age && gender) && <p>{age +' '+ gender}</p>}
                        <p className='text-xl'>{about}</p>
                    </div>
                </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections