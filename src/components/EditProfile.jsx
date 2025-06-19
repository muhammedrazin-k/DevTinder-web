import React, { useState } from 'react'
import UserCard from './userCard'
import axios from 'axios'
import { Base_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { combineSlices } from '@reduxjs/toolkit'

const EditProfile = ({user}) => {
    const [firstName,setFirstName]=useState(user.firstName)
    const [lastName,setLastName]=useState(user.lastName)
    const [age, setAge]=useState(user.age)
    const [gender, setGender]=useState(user.gender)
    const [about, setAbout]=useState(user.about)
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
    const [successfull,setsuccessful]=useState('')
    const [showtoast,setShowtoast]=useState(false)
    const [error,setError]=useState('')
    
    const dispatch=useDispatch()

    const saveProfile=async()=>{
        //clear errors
        setError('')
        setsuccessful('')
        try {
            const res=await axios.patch(Base_URL+'/profile/edit',{firstName,lastName,age,gender,about,photoUrl},{withCredentials:true})
            console.log(res.data.data)
            dispatch(addUser(res.data.data))
            setsuccessful('successfully edited your profile..')
            setShowtoast(true)
            setTimeout(() => {
                setShowtoast(false)
            }, 3000);
        } catch (err) {
            setError(err?.response?.data.message)
            console.log(err)
        }
    }

  return (
    <div className='flex justify-center my-10'>
    <div className="flex justify-center mx-10">
    <div className="card  bg-stone-300 w-96 ">
      <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>
        <div>
          <fieldset className="fieldset pb-2">
            <legend className="fieldset-legend">firstName</legend>
            <input
              type="text"
              className="input"
              placeholder="edit your first Name"
              value={firstName}
              onChange={(event)=>setFirstName(event.target.value)}
              
            />
          </fieldset>
          <fieldset className="fieldset pb-2">
            <legend className="fieldset-legend">lastName</legend>
            <input
              type="text"
              className="input"
              placeholder="edit your updated last Name"
              value={lastName}
              onChange={(event)=>setLastName(event.target.value)}
              
            />
          </fieldset>
          <fieldset className="fieldset pb-2">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input"
              placeholder="edit your updated age"
              value={age}
              onChange={(event)=>setAge(event.target.value)}
              
            />
          </fieldset>
          <fieldset className="fieldset pb-2">
            <legend className="fieldset-legend">Gender</legend>
            <label className="flex items-center gap-2">
            <input
              type="radio"
              className="radio"
              value='male'
              name='gender'
              checked={gender==='male'}
             
              onChange={(event)=>setGender(event.target.value)}
              
            />male
            </label>
            <label className="flex items-center gap-2">
            <input
              type="radio"
              className="radio"
              value='female'
              name='gender'
              checked={gender==='female'}
              onChange={(event)=>setGender(event.target.value)}
              
            />female
            </label>
          </fieldset>
          <fieldset className="fieldset pb-2">
            <legend className="fieldset-legend">about</legend>
            <textarea
              type="text"
              className="textarea"
              placeholder="edit your about section"
              value={about}
              onChange={(event)=>setAbout(event.target.value)}
              
            />
          </fieldset>
          <fieldset className="fieldset pb-2">
            <legend className="fieldset-legend">Photo url</legend>
            <textarea
              type="textarea"
              className="textarea"
              placeholder="edit your photo Url"
              value={photoUrl}
              onChange={(event)=>setPhotoUrl(event.target.value)}
              
            />
          </fieldset>
           
        <p className="text-green-500 text-center">{successfull} </p>
        <p className="text-red-500 text-center">{error} </p>
        </div>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={saveProfile} >Save Profile </button>
        </div>
      </div>
    </div>
  </div>
    <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>

    {showtoast && <div className="toast toast-top toast-center">
  
  <div className="alert alert-success">
    <span>Edited your profile successfully.</span>
  </div>
</div>}
  </div>
  )
}

export default EditProfile