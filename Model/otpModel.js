import { Schema,model } from 'mongoose';

export const Otp = model('otp', Schema({
    phone : {
        type : String,
        required :true
    },
    otp : {
        type : String,
        required : true
    },
    createdAt : {type:Date,default: Date.now,index:{
        expires : 300
    }}
},{timestamps : true}))