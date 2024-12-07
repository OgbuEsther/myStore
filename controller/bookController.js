// Add this line at the top of the file
const mongoose = require('mongoose');

 const bookModel= require("../model/bookModel")
const userModel = require('../model/userModel');

 
//user sign up
// exports.createUser = async (req, res) => {
//     try {
//       const user = new UserModel(req.body);
//       await user.save();
//       res.status(201).send(user);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   };
 
 
  //post method
exports.createBook = async(req , res)=>{
try {
    const getUserId = await userModel.findById(req.params.userId)
    const {title , description , category} = req.body
    if(!title && !description && !category){
      return res.status(400).json({
        message : "all fields are required"
      })
    }else if(!title || !description || !category){
      return res.status(400).json({
        message : "please enter valid information"
      })
    }
    const newBook = await bookModel.create({
        title , description , category
    })
    getUserId.Books.push(newBook._id)
    await getUserId.save()
    return res.status(201).json({
        message : "New book created",
        data : newBook
    })
} catch (error) {
    console.error("no book added" , error)
}
  }
 
//get method
exports.getAllUsers = async(req , res)=>{
  try {
    const books = await bookModel.find()
    return res.status(200).json({
      message : "gotten all books",
      data : newBook
    })
  } catch (error) {
    return res.status(400).json({
      message : "couldn't get book",
      error
    })
  }
}
 
 
//get one method
exports.getOneById = async(req , res)=>{
  try {
    // const {id} = req.params
    // const users = await UserModel.findById({id})
    const books = await bookModel.findById(req.params.id)
    return res.status(200).json({
      message : "gotten the book",
      data :newbook
    })
  } catch (error) {
    return res.status(400).json({
      message : "couldn't get book",
      error
    })
  }
}
 
exports.getOneByName = async(req , res)=>{
  try {
    const {title} = req.body
    if(!title){
      return res.status(404).json({
        message : "please enter title"
      })
    }
    const users = await bookModel.findOne({title})
    return res.status(200).json({
      message : "gotten the book",
      data : newbook
    })
  } catch (error) {
    return res.status(400).json({
      message : "couldn't get book",
      error
    })
  }
}

//update method
exports.updateBook = async(req , res)=>{
  try {
    const {id} = req.params
    const {category , title} = req.body
    const update = await bookModel.findByIdAndUpdate(id, {category, title}, {new:true})
    //const update = await userModel.findByIdAndUpdate(req.params.id, req.body.password,{new:true})
    return res.status(202).json({
      message : "updated",
      data : update
    })
  }catch (error){
    return res.status(400).json({
      message : "couldn't update",
      error
    })
  }
}
 

//delete method
exports.deleteBook = async(req , res)=>{
  try{
    const removeBook = await bookModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      message:"book deleted",
    })
  }catch (error){
    return res.status(400).json({
      message : "couldn't delete",
      error
    })
  }
}

//findOneandDelete method
exports.getOneAndDelete = async(req , res)=>{
  try {
    const {name} = req.body
    const users = await bookModel.findOneAndDelete({title})
    return res.status(200).json({
      message : "gotten the book",
      data : books
        })
  } catch (error) {
    return res.status(400).json({
      message : "couldn't get book",
      error
    })
  }
}

// Books : [
//   {type : mongoose.Schema.Types.ObjectId ,
//     ref : "books"
//   }
// ]