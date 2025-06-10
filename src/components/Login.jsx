import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constant";

const Login = () => {
  const [EmailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()

    const handleChange = (event) => setEmail(event.target.value);
    const handleLogin=async()=>{
      try {
        const res=await axios.post(
          Base_URL +'/login',
          {
          EmailId,password
        },{withCredentials:true})
        console.log(res.data)
        dispatch(addUser(res.data))
        navigate("/")
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="flex justify-center my-20">
      <div className="card  bg-green-400 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center">login</h2>
          <div>
            <fieldset className="fieldset pb-2">
              <legend className="fieldset-legend">EmailId </legend>
              <input
                type="text"
                className="input"
                placeholder="enterEmail@gmail.com"
                value={EmailId}
                onChange={handleChange}
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                placeholder="enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>login </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
