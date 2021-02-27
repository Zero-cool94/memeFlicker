import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import * as sessionActions from "../../store/session";
import {createPhoto} from "../../store/photo"



const UpLoadButton = ()=>{
  const dispatch = useDispatch()
  const user = useSelector(state=>state.session.user)
const [image , setImage] = useState (null)
const [description , setDescription] = useState ("")
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPhoto(user.id , description , image ))
  }
  const updateImage = (e)=>{
    const file = e.target.files[0]
    if (file)setImage(file)

  }
  const updateDescription = (e)=>{
    setDescription(e.target.value)
  }
  return (
    <>
      <form  onSubmit = {handleSubmit}>
       <input type="text" placeholder="description" value={description} onChange={updateDescription} />
       <input type="file"  onChange={updateImage} />
       <button type="submit"> submit </button>
      </form>

    </>

  )
}
export default UpLoadButton
