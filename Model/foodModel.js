import { Schema,model } from 'mongoose';

export const Otp = model('otp', Schema({
    image : {
        type : String,
        default:''
    },
    shopName : {
        type : String,
        default:''
    },
    shopName : {
        type : String,
        default:''
    },
    createdAt : {type:Date,default: Date.now}
},{timestamps : true}))