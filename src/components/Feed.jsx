import axios from 'axios'
import React from 'react'
import { Base_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice'
import { useEffect } from 'react'
import UserCard from './userCard'


const Feed=()=> {
  const dispatch =useDispatch()
  const feed=useSelector((store)=>store.feed)

  const getFeed=async()=>{
      try {
        if(feed) return
      const res=await axios.get(Base_URL+"/feed",{withCredentials:true})
      console.log(res.data.feedUsers)
      dispatch(addfeed(res?.data.feedUsers))
    } catch (err) {
      console.log(err)
      
    }
    }
    

  useEffect(()=>{
    getFeed()
  },[])

  if(!feed||feed.length==0){
    return <h3 className='text-center my-10'>there is no feed user now</h3>
  }
  
  return (
    feed &&(<div className='flex justify-center my-4 ' >
      <UserCard user={feed[0]}/>
    </div>
  )
  )
}

export default Feed