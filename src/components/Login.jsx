import {useEffect, useState } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constant";

const Login = () => {
  const [EmailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setfirstName]=useState('')
  const [lastName,setlastName]=useState('')
  const [isloginform,setisloginform]=useState(true)
  const [error,seterror]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const user=useSelector((store)=>store.user)

  const useEffect=(()=>{
    if(user){
      navigate('/profile')
    }
  },[user,navigate])

    const handleChange = (event) => setEmail(event.target.value);
    const handlesignup=async()=>{
      try {
        const res=(await axios.post(Base_URL + '/signup',{firstName,lastName,EmailId,password},{withCredentials:true}))

        console.log(res.data.data)
        dispatch(addUser(res.data.data))
        return navigate('/profile')
        
      } catch (err) {
        seterror(err?.response?.data|| 'some thing went wrong..!')
      }
    }
    const handleLogin=async()=>{
      try {
        const res=await axios.post(
          Base_URL +'/login',
          {
          EmailId,password
        },{withCredentials:true})
        dispatch(addUser(res.data))
       return navigate("/")
        
      } catch (error) {
        seterror(error?.response?.data||error.message)
        console.log(error)
      }
    }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-red-600 to-red-900 min-h-screen">
      <div className="card  p-2  bg-gradient-to-br from-red-800 to-red-950 shadow-[2px_18px_20px_rgba(0,0,0,0.9)]  w-[350px] sm:w-[500px]">
        <div className="card-body ">
          <div className="loginHead">
          <h2 className="card-title justify-center text-white">{isloginform ?'Login':'Sign up'}</h2>
          </div>
          <div className="   w-100">
             {!isloginform && <>
            <fieldset className="fieldset pb-2 ">
             <legend className="fieldset-legend">First Name </legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(event)=>setfirstName(event.target.value)}
              />
              </fieldset>
              <fieldset>
              <legend className="fieldset-legend">Last Name </legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(event)=>setlastName(event.target.value)}
              />
              </fieldset>
              </>}
              <fieldset>
              <legend className="fieldset-legend w-full  ">EmailId </legend>
              <input
                type="text"
                className="input w-full"
                placeholder="enterEmail@gmail.com"
                value={EmailId}
                onChange={handleChange}
              />
              </fieldset>
              <fieldset>
              <legend className="fieldset-legend  w-full">Password</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-yellow-500 text-center">{error} </p>
          <div className="card-actions justify-center p-2">
            <button type="button" className="border border-2 text-lg py-2 rounded-lg hover:bg-green-600 hover:border-0 text-white bg-transparent   w-full transition-colors duration-1000" onClick={isloginform? handleLogin :handlesignup}>{ isloginform?"login":"Sign in"} </button>
          </div>
         <p className="text-center text-white underline  cursor-pointer" onClick={()=>setisloginform((value)=>!value)}>{isloginform?'new user sign up here..!':'Existing user login here..!'}</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
