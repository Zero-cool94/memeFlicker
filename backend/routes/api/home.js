const express = require( 'express' );
const asyncHandler = require("express-async-handler");

const {singlePublicFileUpload,singleMulterUpload} = require("../../awsS3")
const { Photo } = require("../../db/models");
const router = express.Router()


router.post("/photo", asyncHandler(async (req, res)=>{

const {user_id , description } = req.body
console.log(req.body, "<<<<<<<<<<<<<<<<<<" )
console.log(req.file , "+=================")
// const profilePhotoUrl = await singlePublicFileUpload(req.file)
// const newPhoto = await Photo.create({user_id , description ,photo_url:profilePhotoUrl})
// if (newPhoto ){
//   res.json(newPhoto)
// }else{
//   res.json({success: false , message:"somthing went wrong try again ..."})
// }



}))


module.exports = router
