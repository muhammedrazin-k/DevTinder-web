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
            dispatch(addUser(response.data))
            
        } catch (err) {
            if(err.status==401){
                navigate('/login')
            }
            console.log(err)
            
        }
    })

    useEffect(()=>{
       
        fetchUser()
    })
    
    
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-1">

            <Outlet/>
            </main>
            <Footer/>
            

        </div>
    )


}

export default Body;