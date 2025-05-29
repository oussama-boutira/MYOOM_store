import mongoose, { Schema } from "mongoose";
const userShema  = new Schema({
    firstname:{type:String, required:true},
    lastname:{type:String ,required:true},
    email:{type:String ,required:true},
    password:{type:String ,required:true},
    role:{type:String, default:'user'},
    
})

export const userModel = mongoose.model('users',userShema)