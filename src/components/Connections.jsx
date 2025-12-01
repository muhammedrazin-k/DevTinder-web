import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

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
        <h1 className='text-center text-3xl font-poppins font-bold text-white'>Connections</h1>

        {connections.map((connections)=>{
            const {_id,firstName,lastName,photoUrl,gender,age,about}=connections

            return(
                <div key={_id} className='my-6 flex justify-center'>
                <div  className='flex justify-between p-4 flex-col sm:flex-row items-center bg-gradient-to-r from-rose-300 to-orange-200 hover:rotate-2 hover:scale-110 hover:shadow-[2px_-15px_20px_rgba(0,0,0,0.9)] rounded-xl w-3/4 transition-all duration-[800ms]' >
                    <img className='rounded-full w-[180px] h-[180px] object-cover' src={photoUrl} alt="photo"  />
                    <div className="text  text-left p-6">
                        <h1 className='text-3xl font-bold font-poppins uppercase'>{firstName+' '+lastName}</h1>
                        {(age && gender) && <p>{age +' '+ gender}</p>}
                        <p className='text-lg leading-none lg:leading-tight'>{about}</p>
                    </div>
                    <Link to={`/chat/${_id}`}>
                    <button className='bg-green-700 px-4 py-2 rounded-lg text-white'>chat</button>
                    </Link>
                </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections