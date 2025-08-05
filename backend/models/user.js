import mongoose from "mongoose";
import { Profiler } from "react";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            require:true,
            unique:true,
        },
        fullName:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,
            minlength:6
        },
        ProfilePic:{
            type:String,
            default:""
        },
        bio:{
            type:String,
        }

    },{timestamps: true}
)

export const User = mongoose.model("User", userSchema)