import { Schema,model } from 'mongoose';

export const Restorent = model('restaurant',Schema({
    restorentsImage : {
        type : String,
        default:''
    },
    restorentsName : {
        type : String,
        default:''
    },
    location : {
      type : String,
     default:''
    },
    lattitude:{
        type : Number,
        default:''
    },
    longitude:{
        type : Number,
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
    overallReview:{
        type : Number,
        default:''
    },
    waitingTime:{
        onSaturdaySunday:{
            type:Number,
            default:''
        },
        onRegularday:{
            type:Number,
            default:''
        },
        onHolidays:{
            type:Number,
            default:''
        }
    },
    restorentFoodReview:{
        restorentFoodImage : {
            type : String,
            default:''
        },
        testReview : {
            type : Number,
            default:''
        },
        qualityReview : {
            type : Number,
            default:''
        },
        quantityReview : {
            type : Number,
            default:''
        },
        presentationReview : {
            type : Number,
            default:''
        }
    },
    restorentExperienceReview:{
        interiorImage : {
            type : String,
            default:''
        },
        vibeReview : {
            type : Number,
            default:''
        },
        locationReview : {
            type : Number,
            default:''
        },
        serviceReview : {
            type : Number,
            default:''
        },
        orderWaitingTime:{
            onSaturdaySunday:{
                type:Number,
                default:''
            },
            onRegularday:{
                type:Number,
                default:''
            },
            onHolidays:{
                type:Number,
                default:''
            },    
        },
        foodWaitingTime:{
            onSaturdaySunday:{
                type:Number,
                default:''
            },
            onRegularday:{
                type:Number,
                default:''
            },
            onHolidays:{
                type:Number,
                default:''
            },
    
        },
        cleannessReview : {
            type : Number,
            default:''
        },
        staffBehaviorReview : {
            type : Number,
            default:''
        },
        managerBehaviorReview : {
            type : Number,
            default:''
        },
        description : {
            type : String,
            default:''
        },
    },
    FoodReview:[{
        foodName:{
            type: String,
            default:''
        },
        foodImage : {
            type : String,
            default:''
        },
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
        quantityReview : {
            type : Number,
            default:''
        },
        presentationReview : {
            type : Number,
            default:''
        },
        description : {
            type : String,
            default:''
        }}
    ],
    token:{
        type:String,
        default:''
    },

    createdAt : {type:Date,default: Date.now}
},{timestamps : true}))