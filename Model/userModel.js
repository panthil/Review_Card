import { Schema,model } from "mongoose"; 
import Jwt  from "jsonwebtoken";

const userSchema = Schema({
    userData:{
        image:{
            type:String,
            default:''
        },
        firstName :{
            type : String,
            default: ''
        },
        lastName :{
            type : String,
            default: ''
        },
        gender :{
            type : String,
            default: ''
        },
        DOB :{
            type : String,
            default: ''
        },
        phone :{
            type : Number,
        },
        area :{
            type : String,
            default: ''
        },
        city :{
            type : String,
            default: ''
        },
        state :{
            type : String,
            default: ''
        },
        country :{
            type : String,
            default: ''
        },
        pincode :{
            type : Number,
            default: ''
        },
        createdAt : {type:Date,default: Date.now}
    },
    favoriteFood:{
        type : {
            type : String,
            default: ''
        },
        cuisine : {
            type : String,
            default: ''
        },
        fastFood : {
            type : String,
            default: ''
        },
        favoriteFood : {
            type : Array,
            default: ''
        },
        famousFoodArea : {
            type : Array,
            default: ''
        },
        famousFoodCity : {
            type : Array,
            default: ''
        },
        createdAt : {type:Date,default: Date.now}
    },
    token: {
        type : String,
        default: ''
    }

        
           
    
}, {timestamps:true});

// userSchema.pre('save', async function (next) {
//     // Only run this function if password was moddified (not on other update functions)
//     if (!this.isModified('password')) return next();
//     // Hash password with strength of 12
//     this.password = await bcrypt.hash(this.password, 12);
//     //remove the confirm field 
//     this.passwordConfirm = undefined;
//   });

// userSchema.methods.generateJWT = function () {
//     const token = Jwt.sign({
//         _id:this._id,
//         phone:this.phone
//     },process.env.SECRET_KEY);
//     this.token = this.token;
//     return token
// }
export const User = model('user',userSchema);