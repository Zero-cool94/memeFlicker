import { csrfFetch } from "./csrf";



const UPLOAD_PHOTO = "UPLOAD_PHOTO"

const setPhoto = (photo ) =>({
type:UPLOAD_PHOTO,
payload:photo

})

export const createPhoto =(user_id , description , file) => async(dispatch)=>{
  const formData = new FormData()
  formData.append("user_id" , user_id  )
  formData.append("description" , description)
  formData.append("image" , file)
  console.log(user_id , description, file)

  const res = await csrfFetch("/api/home/photo",{
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
  const data = await res.json();
  dispatch(setPhoto(data))
}

export default function reducer(state=[], action){
  switch (action.type){
    case UPLOAD_PHOTO:
      return [... state, action.payload]
    default :
      return state
  }
}
