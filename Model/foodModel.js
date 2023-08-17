import { Schema,model } from 'mongoose';

export const foodReview = model('foodReview', Schema({
    foodAssets:{
        shopImage : {
            type : String,
            default:''
        },
        foodImage : [{
            image1:{
                type:String,
                default:''
            },
            image1:{
                type:String,
                default:''
            },
            image1:{
                type:String,
                default:''
            },
        }]
    },
    shopName : {
        type : String,
        default:''
    },
    location : {
        type : String,
        default:''
    },
    state : {
        type : String,
        default:''
    },
    city : {
        type : String,
        default:''
    },
    area : {
        type : String,
        default:''
    },
    pincode : {
        type : String,
        default:''
    },
    
    foodReview:{
        overallReview : {
            type : Number,
            default:''
        },
        testlReview : {
            type : Number,
            default:''
        },
        qualityReview : {
            type : Number,
            default:''
        },
        cleanlinessReview : {
            type : Number,
            default:''
        },
        staffReview : {
            type : Number,
            default:''
        },
    },

    createdAt : {type:Date,default: Date.now}
},{timestamps : true}))