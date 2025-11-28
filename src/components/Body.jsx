import Navbar from "./navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { Base_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userData=useSelector((store)=>store.user)
   

    const fetchUser=(async()=>{
        try {
            if(userData) return;
            const response=await axios.get(Base_URL+'/profile/view',{withCredentials:true})
            console.log(response)
            dispatch(addUser(response.data))
            
        } catch (err) {
            if(err.response && err.response.status==401){
                navigate('/login')
            }
            console.log('axios error:'+ err)
            
        }
    })

    useEffect(()=>{
       
        fetchUser()
    },[])
    
    
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-red-950 to-red-700">
            {userData && <Navbar/>}
            <main className="flex-1">

            <Outlet/>
            </main>

            {userData && <Footer/>}
            

        </div>
    )


}

export default Body;